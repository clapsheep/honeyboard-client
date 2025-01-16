import WebRecommendForm from "@/components/templates/WebRecommendForm";
import useToastEditor from "@/hooks/useToastEditor";
import { useAuth } from "@/hooks/useAuth";
import { useModalStore } from "@/stores/modalStore";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { updateWebRecommendAPI, getWebRecommendDetailAPI } from "@/api/WebRecommendAPI";

const WebRecommendUpdate = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();
    const { data } = useQuery({
        queryKey: ['web_recommend', recommendId],
        queryFn: () => getWebRecommendDetailAPI({ recommendId: recommendId as string }),
    });

    const navigate = useNavigate();
    const [title, setTitle] = useState(data?.title);
    const [url, setUrl] = useState(data?.url);
    const { openModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const{ onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webRecommendEditor',
        initialContent: data?.content ?? '',
    })

    const handleCancel = async () => {
        const confirm = await onCancel();
        if(confirm){
            navigate(-1);
        }
    }

    const handleSubmit = async () => {
        if (!title.trim()) {
            openModal({
                title: '제목을 입력해주세요.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }

        if (!url.trim()) {
            openModal({
                title: 'URL을 입력해주세요.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }
        
        if (!userId || !generationId) {
            openModal({
                title: '로그인 후 이용해주세요.',
                onCancelClick: () => {
                    navigate('/login');
                },
            });
            return;
        }
        
        try {
            const { content } = await onSubmit();

            if(!recommendId){
                throw new Error('recommendId is required');
            }
            await updateWebRecommendAPI({
                recommendId: recommendId,
                data: {
                    title,
                    content,
                    url,
                },
            });

            navigate(`/study/web/recommend/${recommendId}`);
        } catch (error: any) {
            if (error.response?.data?.message === "이미 등록된 URL입니다.") {
                openModal({
                    title: '이미 등록된 URL입니다.',
                    onCancelClick: () => {
                        navigate(-1);
                        return;
                    },
                });
            } else {
                openModal({
                    title: '게시글 작성을 실패했습니다.',
                    onCancelClick: () => {
                        navigate(-1);
                    },
                });
            }
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const mode = 'edit' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleUrlChange,
        handleCancel,
        handleSubmit,
        title: title ?? '',
        url: url ?? '',
    };

    return <WebRecommendForm {...props} />;

};

export default WebRecommendUpdate;
