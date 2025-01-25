import { createTrackTeamAPI } from '@/api/trackAPI';
import { TrackProjectTeam } from '@/components/templates';
import { useCreateTrackTeam } from '@/hooks/useTrackProject';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const TrackProjectTeamCreate = () => {
    const props = useCreateTrackTeam();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { trackProjectId } = useParams();
    const handleAPIButton = async () => {
        if (!props.contain) {
            setModalOpen(true);
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
                navigate(`/track/${trackProjectId}`);
            } else {
                throw new Error('프로젝트 생성 실패');
            }
        } catch (error) {
            console.error('에러 발생', error);
        }
    };

    return (
        <TrackProjectTeam
            mode={'create'}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default TrackProjectTeamCreate;
