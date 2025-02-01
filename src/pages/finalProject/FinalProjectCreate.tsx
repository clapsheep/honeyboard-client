import { createFinaleProjectAPI } from '@/api/finaleAPI';
import FinaleProjectTeam from '@/components/templates/FinaleProjectTeam';
import { useFinaleProject } from '@/hooks/useFinaleProject';
import { FinaleProjectCreate } from '@/types/FinaleProject';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const FinalProjectCreate = () => {
    const props = useFinaleProject();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const { title, objective, git, teamLeader, teamMember } = props;

    // 보류
    const handleAPIButton = async () => {
        const projectData: FinaleProjectCreate = {
            title: title,
            description: objective,
            url: git,
            teams: {
                leaderId: teamLeader[0].id,
                memberIds: teamMember.map((member) => member.id),
            },
        };

        try {
            const res = await createFinaleProjectAPI({ data: projectData });

            navigate(`/project/final/${res.data.id}`);
        } catch (error) {
            console.error(`에러 발생`, error);
        }
    };

    return (
        <FinaleProjectTeam
            mode={'create'}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default FinalProjectCreate;
