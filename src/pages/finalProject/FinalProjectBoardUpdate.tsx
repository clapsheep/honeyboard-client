import {
    getFinaleProjectBoardDetailAPI,
    updateFinaleProjectBoardAPI,
} from '@/api/finaleAPI';
import ProjectBoardForm from '@/components/templates/ProjectBoardForm';
import { useProjectDetail } from '@/hooks/useProjectDetail';
import useToastEditor from '@/hooks/useToastEditor';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const FinalProjectBoardUpdate = () => {
    const { pathname } = useLocation();
    const { finaleProjectId, boardId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const { openModal } = useModalStore();

    const data = useProjectDetail({
        getAPI: getFinaleProjectBoardDetailAPI,
        requestParam:
            finaleProjectId && boardId ? { finaleProjectId, boardId } : undefined,
    });

    useEffect(() => {
        if (data) {
            setTitle(data.title ?? '');
            setSummary(data.summary ?? '');
        }
    }, [data]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'finaleProjectBoardEditor',
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
                    navigate(-1);
                },
            });
            return;
        }

        if (!boardId) {
            openModal({
                title: '해당하는 게시글이 없습니다.',
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

            const id = await updateFinaleProjectBoardAPI({
                finaleProjectId,
                boardId,
                data: {
                    title: title.trim(),
                    summary,
                    content,
                    thumbnail,
                },
            });

            navigate(`/project/final/${finaleProjectId}/board/${boardId}`);
        } catch (error) {
            console.error('게시글 수정을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    const mode = 'edit' as const;
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

export default FinalProjectBoardUpdate;
