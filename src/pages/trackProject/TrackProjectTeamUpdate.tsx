import { updateTrackTeamAPI } from '@/api/trackAPI';
import { TrackProjectTeam } from '@/components/templates';
import { useCreateTrackTeam } from '@/hooks/useTrackProject';
import { useModalStore } from '@/stores/modalStore';
import { TrackProjectBoardDetailResponse } from '@/types/TrackProject';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const TrackProjectTeamUpdate = () => {
    const props = useCreateTrackTeam();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();
    const { trackProjectId, trackTeamId, boardId } = useParams();
    const { setTeamLeader, setTeamMember } = props;

    const handleAPIButton = async () => {
        if (props.teamLeader.length == 0) {
            openModal({
                title: '팀장은 필수입니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        if (!props.contain) {
            openModal({
                title: '팀에 본인이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        const teamData = {
            id: trackTeamId!,
            leaderId: props.teamLeader[0].id,
            memberIds: props.teamMember.map((item) => item.id),
        };

        const req = {
            trackProjectId: trackProjectId!,
            trackTeamId: trackTeamId!,
            data: teamData,
        };

        try {
            const res = await updateTrackTeamAPI(req);

            if (res.status == 200) {
                navigate(`/project/track/${trackProjectId}`);
            } else {
                throw new Error('팀 수정 실패');
            }
        } catch (error) {
            openModal({
                title: '팀 생성에 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            console.error('에러 발생', error);
        }
    };

    const queryClient = useQueryClient();

    useEffect(() => {
        const data = queryClient.getQueryData<TrackProjectBoardDetailResponse>([
            'projectBoardDetail',
            'track',
            boardId,
        ]);

        if (data == undefined) {
            openModal({
                title: '프로젝트 데이터를 불러오는 것을 실패했습니다.',
                onCancelClick: () => {
                    navigate(-1);
                },
            });
            return;
        }

        const leaders = [];
        const members = [];

        for (const member of data.members) {
            if (member.role === 'LEADER') {
                leaders.push({ id: member.id, name: member.name });
            } else {
                members.push({ id: member.id, name: member.name });
            }
        }

        setTeamLeader(leaders);
        setTeamMember(members);
    }, [setTeamLeader, setTeamMember, navigate, queryClient, boardId]);

    return (
        <TrackProjectTeam
            mode={'edit'}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default TrackProjectTeamUpdate;
