import { createFinaleProjectBoardAPI } from '@/api/finaleAPI';
import ProjectBoardForm from '@/components/templates/ProjectBoardForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const FinalProjectBoardCreate = () => {
    const { pathname } = useLocation();
    const { finaleProjectId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const { openModal, closeModal } = useModalStore();

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'finaleProjectBoardEditor',
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

        if (!finaleProjectId) {
            openModal({
                title: '프로젝트가 없습니다.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }

        try {
            const { content, thumbnail } = await onSubmit();

            const data = await createFinaleProjectBoardAPI({
                finaleProjectId,
                data: {
                    title: title.trim(),
                    summary,
                    content,
                    thumbnail,
                },
            });

            navigate(`/project/final/${finaleProjectId}/board/${data.id}`);
        } catch (error) {
            console.error('게시글 작성을 실패했습니다:', error);
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

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    const mode = 'create' as const;
    const project = 'final' as const;
    const props = {
        mode,
        project,
        pathname,
        title,
        subTitle: summary,
        handleCancel,
        handleSubmit,
        handleTitleChange,
        handleSubTitleChange: handleSummaryChange,
        editorRef,
    };

    return (
        <>
            <ProjectBoardForm {...props} />
        </>
    );
};

export default FinalProjectBoardCreate;
