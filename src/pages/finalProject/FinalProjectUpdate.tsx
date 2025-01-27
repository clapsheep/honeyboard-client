import {
    getFinaleProjectDetailAPI,
    updateFinaleProjectAPI,
} from '@/api/finaleAPI';
import FinaleProjectTeam from '@/components/templates/FinaleProjectTeam';
import { useFinaleProject } from '@/hooks/useFinaleProject';
import { FinaleProjectUpdate } from '@/types/FinaleProject';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const FinalProjectUpdate = () => {
    const props = useFinaleProject();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { finalProjectId } = useParams();
    const [teamId, setTeamId] = useState<string>('');
    const {
        title,
        objective,
        git,
        setTitle,
        setObjective,
        setGit,
        //       teamLeader,
        //      teamMember,
        setTeamLeader,
        setTeamMember,
    } = props;

    useEffect(() => {
        const getDetail = async () => {
            try {
                console.log(finalProjectId);

                if (!finalProjectId) {
                    return;
                }

                const data = await getFinaleProjectDetailAPI({
                    finaleProjectId: finalProjectId,
                });

                console.log(data);

                setTitle(data.title);
                setObjective(data.description);
                setGit(data.url);
                setTeamLeader(
                    data.members.filter((member) => member.role === 'LEADER'),
                );
                setTeamMember(
                    data.members.filter((member) => member.role === 'MEMBER'),
                );
                setTeamId(data.finaleTeamId);
            } catch (error) {
                console.error(error);
            }
        };

        getDetail();
    }, []);

    // 보류
    const handleAPIButton = async () => {
        const projectData: FinaleProjectUpdate = {
            title: title,
            description: objective,
            url: git,
        };

        // const teamData: FinaleProjectTeamUpdate = {
        //     leaderId: teamLeader[0].id,
        //     memberIds: teamMember.map((member) => member.id),
        // };

        try {
            await updateFinaleProjectAPI({
                finaleProjectId: finalProjectId!,
                data: projectData,
            });

            navigate(`/project/final/${finalProjectId}`);
        } catch (error) {
            console.error(`에러 발생`, error);
        }
    };

    return (
        <FinaleProjectTeam
            mode={'edit'}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default FinalProjectUpdate;
