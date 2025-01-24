import {
    getTrackProjectBoardDetailAPI,
    updateTrackProjectBoardAPI,
} from '@/api/trackAPI';
import ProjectBoardForm from '@/components/templates/ProjectBoardForm';
import { useProjectDetail } from '@/hooks/useProjectDetail';
import useToastEditor from '@/hooks/useToastEditor';
import { useModalStore } from '@/stores/modalStore';
import { useTeamStore } from '@/stores/teamStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

const TrackProjectBoardUpdate = () => {
    const { pathname } = useLocation();
    const { trackProjectId, trackTeamId, boardId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { openModal } = useModalStore();

    const data = useProjectDetail({
        getAPI: getTrackProjectBoardDetailAPI,
        requestParam:
            trackProjectId && trackTeamId && boardId
                ? { trackProjectId, trackTeamId, boardId }
                : undefined,
    });

    useEffect(() => {
        if (data) {
            setTitle(data.title ?? '');
            setUrl(data.url ?? '');
        }
    }, [data]);

    const members = useTeamStore(
        useShallow(
            (state) =>
                state.teams.find((team) => team.id === trackTeamId)?.members ??
                [],
        ),
    );

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'trackProjectBoardEditor',
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

        if (!trackProjectId || !trackTeamId) {
            openModal({
                title: '프로젝트 혹은 팀이 없습니다.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }

        try {
            const { content, thumbnail } = await onSubmit();

            await updateTrackProjectBoardAPI({
                trackProjectId,
                trackTeamId,
                boardId,
                data: {
                    title: title.trim(),
                    url,
                    content,
                    thumbnail,
                },
            });

            navigate(
                `/project/track/${trackProjectId}/team/${trackTeamId}/board/${boardId}`,
            );
        } catch (error) {
            console.error('게시글 수정을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const mode = 'edit' as const;
    const project = 'track' as const;
    const props = {
        mode,
        project,
        pathname,
        members,
        title,
        subTitle: url,
        handleCancel,
        handleSubmit,
        handleTitleChange,
        handleSubTitleChange: handleUrlChange,
        editorRef,
    };

    return (
        <>
            <ProjectBoardForm {...props} />
        </>
    );
};

export default TrackProjectBoardUpdate;
