import { createTrackTeamAPI } from '@/api/trackAPI';
import { TrackProjectTeam } from '@/components/templates';
import { useCreateTrackTeam } from '@/hooks/useTrackProject';
import { useModalStore } from '@/stores/modalStore';
import { useNavigate, useParams } from 'react-router';

const TrackProjectTeamCreate = () => {
    const props = useCreateTrackTeam();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();

    const { trackProjectId } = useParams();
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
                title: '해당 팀에 본인이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        const teamData = {
            leaderId: props.teamLeader[0].id,
            memberIds: props.teamMember.map((item) => item.id),
        };
        const req = {
            trackProjectId: trackProjectId!,
            data: teamData,
        };

        try {
            const res = await createTrackTeamAPI(req);

            if (res.status == 201) {
                navigate(`/project/track/${trackProjectId}`);
            } else {
                throw new Error('프로젝트 생성 실패');
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

    return (
        <TrackProjectTeam
            mode={'create'}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default TrackProjectTeamCreate;
