import WebRecommendForm from '@/components/templates/WebRecommendForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
    updateWebRecommendAPI,
    getWebRecommendDetailAPI,
    deleteWebRecommendAPI,
} from '@/api/WebRecommendAPI';
import { useContentDetail } from '@/hooks/useContentDetail';
import { AxiosError } from 'axios';

const WebRecommendUpdate = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();
    const { openModal, closeModal } = useModalStore();
    const navigate = useNavigate();

    const { data } = useContentDetail({
        contentType: 'WEB_RECOMMEND',
        contentId: recommendId!,
        requestParam: { recommendId: recommendId! },
        getDetailAPI: getWebRecommendDetailAPI,
        deleteAPI: deleteWebRecommendAPI,
        navigateAfterDelete: 'study',
    });

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const userRole = userInfo?.role;
    const generationId = userInfo?.generationId;

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setUrl(data.url);
        }

        if (userId !== data?.authorId && userRole !== 'ADMIN') {
            openModal({
                title: '페이지 접근 권한이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                    navigate(-1);
                },
            });
        }
    }, [data]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webRecommendEditor',
        initialContent: data?.content ?? '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            openModal({
                title: '제목을 입력해주세요.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        if (!url.trim()) {
            openModal({
                title: 'URL을 입력해주세요.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        if (!recommendId) {
            openModal({
                title: '게시글을 불러오지 못했습니다.',
                onCancelClick: () => {
                    closeModal();
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

            await updateWebRecommendAPI({
                recommendId: recommendId,
                data: {
                    title,
                    content,
                    url,
                },
            });

            navigate(`/study/web/recommend/${recommendId}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '이미 등록된 문제입니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
            } else {
                openModal({
                    title: '게시글 작성을 실패했습니다.',
                    onCancelClick: () => {
                        closeModal();
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
