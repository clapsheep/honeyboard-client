import { createWebGuideAPI } from '@/api/WebGuideAPI';
import WebGuideForm from '@/components/templates/WebGuideForm';
import { useAuth } from '@/hooks/useAuth';
import useToastEditor from '@/hooks/useToastEditor';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const WebGuideCreate = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;
    const userRole = userInfo?.role;

    useEffect(() => {
        if (userRole !== 'ADMIN') {
            openModal({
                title: '페이지 접근 권한이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                    navigate(-1);
                },
            });
        }
    }, []);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webConceptEditor',
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
                    closeModal();
                },
            });
            return;
        }

        try {
            const { content, thumbnail } = await onSubmit();

            const id = await createWebGuideAPI({
                data: {
                    title: title.trim(),
                    content,
                    thumbnail,
                },
            });

            navigate(`/study/web/concept/${id}`);
        } catch (error) {
            console.error('게시글 작성을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const mode = 'create' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleCancel,
        handleSubmit,
        title,
    };
    return <WebGuideForm {...props} />;
};

export default WebGuideCreate;
