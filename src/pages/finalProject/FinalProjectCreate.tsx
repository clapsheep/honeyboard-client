import { createFinaleProjectAPI } from '@/api/finaleAPI';
import FinaleProjectTeam from '@/components/templates/FinaleProjectTeam';
import { useFinaleProject } from '@/hooks/useFinaleProject';
import { useModalStore } from '@/stores/modalStore';
import { FinaleProjectCreate } from '@/types/FinaleProject';
import { useNavigate } from 'react-router';

const FinalProjectCreate = () => {
    const props = useFinaleProject();
    const { openModal, closeModal } = useModalStore();
    const navigate = useNavigate();

    const { title, objective, git, teamLeader, teamMember } = props;

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
            openModal({
                title: '프로젝트 생성을 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            console.error(`에러 발생`, error);
        }
    };

    return (
        <FinaleProjectTeam
            mode={'create'}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default FinalProjectCreate;
