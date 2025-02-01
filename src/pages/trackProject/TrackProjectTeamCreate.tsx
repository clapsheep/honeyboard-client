import { createTrackTeamAPI } from '@/api/trackAPI';
import { TrackProjectTeam } from '@/components/templates';
import { useCreateTrackTeam } from '@/hooks/useTrackProject';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const TrackProjectTeamCreate = () => {
    const props = useCreateTrackTeam();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');

    const { trackProjectId } = useParams();
    const handleAPIButton = async () => {
        if (!props.contain) {
            setModalText('해당 팀에 본인이 없습니다.');
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
                navigate(`/project/track/${trackProjectId}`);
            } else {
                throw new Error('프로젝트 생성 실패');
            }
        } catch (error) {
            setModalText('생성에 실패했습니다.');
            setModalOpen(true);
            console.error('에러 발생', error);
        }
    };

    return (
        <TrackProjectTeam
            mode={'create'}
            modalOpen={modalOpen}
            modalText={modalText}
            setModalOpen={setModalOpen}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default TrackProjectTeamCreate;
