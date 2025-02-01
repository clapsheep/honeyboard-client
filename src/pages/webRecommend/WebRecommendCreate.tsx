import WebRecommendForm from '@/components/templates/WebRecommendForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { createWebRecommendAPI } from '@/api/WebRecommendAPI';
import { AxiosError } from 'axios';

const WebRecommendCreate = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webRecommendEditor',
        initialContent: '',
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

        if (!userId || !generationId) {
            openModal({
                title: '로그인 후 이용해주세요.',
                onCancelClick: () => {
                    navigate('/login');
                    closeModal();
                },
            });
            return;
        }

        try {
            const { content } = await onSubmit();

            const { id } = await createWebRecommendAPI({
                data: {
                    title: title.trim(),
                    content,
                    url,
                },
            });

            navigate(`/study/web/recommend/${id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '이미 등록된 URL입니다.') {
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

    const mode = 'create' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleUrlChange,
        handleCancel,
        handleSubmit,
        title,
        url,
    };

    return <WebRecommendForm {...props} />;
};

export default WebRecommendCreate;
