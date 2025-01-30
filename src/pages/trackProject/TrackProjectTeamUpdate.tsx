import { updateTrackTeamAPI } from '@/api/trackAPI';
import { TrackProjectTeam } from '@/components/templates';
import { useCreateTrackTeam } from '@/hooks/useTrackProject';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const TrackProjectTeamUpdate = () => {
    const props = useCreateTrackTeam();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { trackProjectId, trackTeamId } = useParams();

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
            trackTeamId: trackTeamId!,
            data: teamData,
        };

        try {
            const res = await updateTrackTeamAPI(req);

            if (res.status == 200) {
                navigate(`/project/track/${trackProjectId}`);
            } else {
                throw new Error('프로젝트 생성 실패');
            }
        } catch (error) {
            console.error('에러 발생', error);
        }
    };

    const queryClient = useQueryClient();
    const { setTeamLeader, setTeamMember } = props;

    useEffect(() => {
        const data = queryClient.getQueryData<T>(['track']);

        if (data == undefined) {
            navigate(-1);
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
    }, [setTeamLeader, setTeamMember, navigate, queryClient]);

    return (
        <TrackProjectTeam
            mode={'edit'}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default TrackProjectTeamUpdate;
