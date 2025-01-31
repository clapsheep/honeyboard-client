import AlgorithmGuideForm from '@/components/templates/AlgorithmGuideForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
    updateAlgorithmGuideAPI,
    getAlgorithmGuideDetailAPI,
    deleteAlgorithmGuideAPI,
} from '@/api/AlgorithmGuideAPI';
import { useContentDetail } from '@/hooks/useContentDetail';

const AlgorithmGuideUpdate = () => {
    const { pathname } = useLocation();
    const { guideId } = useParams();
    const { openModal, closeModal } = useModalStore();
    const navigate = useNavigate();

    const { data } = useContentDetail({
        contentType: 'ALGO_GUIDE',
        contentId: guideId!,
        requestParam: { guideId: guideId! },
        getDetailAPI: getAlgorithmGuideDetailAPI,
        deleteAPI: deleteAlgorithmGuideAPI,
        navigateAfterDelete: 'study',
    });

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (data) {
            setTitle(data.title);
        }
    }, [data]);

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'algorithmGuideEditor',
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

            await updateAlgorithmGuideAPI({
                guideId: guideId!,
                data: {
                    title: title.trim(),
                    content,
                    thumbnail,
                },
            });

            navigate(`/study/algorithm/concept/${guideId}`);
        } catch {
            openModal({
                title: '게시글 수정을 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const mode = 'edit' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleCancel,
        handleSubmit,
        title: title ?? '',
    };
    return <AlgorithmGuideForm {...props} />;
};

export default AlgorithmGuideUpdate;
