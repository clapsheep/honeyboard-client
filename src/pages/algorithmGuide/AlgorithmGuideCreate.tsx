import AlgorithmGuideForm from '@/components/templates/AlgorithmGuideForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { createAlgorithmGuideAPI } from '@/api/AlgorithmGuideAPI';

const AlgorithmGuideCreate = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'algorithmGuideEditor',
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

            const { id } = await createAlgorithmGuideAPI({
                data: {
                    title: title.trim(),
                    content,
                    thumbnail,
                },
            });

            navigate(`/study/algorithm/concept/${id}`);
        } catch {
            openModal({
                title: '게시글 작성을 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
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
    return <AlgorithmGuideForm {...props} />;
};

export default AlgorithmGuideCreate;
