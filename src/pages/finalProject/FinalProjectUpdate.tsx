import {
    getFinaleProjectDetailAPI,
    updateFinaleProjectAPI,
    updateFinaleTeamAPI,
} from '@/api/finaleAPI';
import FinaleProjectTeam from '@/components/templates/FinaleProjectTeam';
import { useAuth } from '@/hooks/useAuth';
import { useFinaleProject } from '@/hooks/useFinaleProject';
import { useModalStore } from '@/stores/modalStore';
import {
    FinaleProjectTeamUpdate,
    FinaleProjectUpdate,
} from '@/types/FinaleProject';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const FinalProjectUpdate = () => {
    const props = useFinaleProject();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();
    const { finaleProjectId } = useParams();
    const [teamId, setTeamId] = useState<string>('');
    const {
        title,
        objective,
        git,
        setTitle,
        setObjective,
        setGit,
        teamLeader,
        teamMember,
        setTeamLeader,
        setTeamMember,
        leaderSearch,
        setLeaderSearch,
        memberSearch,
        setMemberSearch,
    } = props;

    useEffect(() => {
        const getDetail = async () => {
            try {
                if (!finaleProjectId) {
                    return;
                }

                const data = await getFinaleProjectDetailAPI({
                    finaleProjectId: finaleProjectId,
                });

                if (userInfo?.role !== 'ADMIN') {
                    if (
                        !data.members.some(
                            (member) => member.id === userInfo?.userId,
                        )
                    ) {
                        navigate(-1);
                    }
                }

                setTitle(data.title);
                setObjective(data.description);
                setGit(data.url);
                setTeamLeader(
                    data.members.filter((member) => member.role === 'LEADER'),
                );
                setLeaderSearch([...leaderSearch, ...teamLeader]);
                setTeamMember(
                    data.members.filter((member) => member.role === 'MEMBER'),
                );
                setMemberSearch([...memberSearch, ...teamMember]);
                setTeamId(data.finaleTeamId);
            } catch (error) {
                openModal({
                    title: '프로젝트 데이터를 불러오는 것을 실패했습니다.',
                    onCancelClick: () => {
                        navigate(-1);
                    },
                });

                console.error(error);
            }
        };

        getDetail();
    }, []);

    const handleAPIButton = async () => {
        if (userInfo?.role !== 'ADMIN') {
            if (
                teamLeader[0].id != userInfo?.userId &&
                !teamMember.some((member) => member.id == userInfo?.userId)
            ) {
                return;
            }
        }

        const projectData: FinaleProjectUpdate = {
            title: title,
            description: objective,
            url: git,
        };

        const teamData: FinaleProjectTeamUpdate = {
            id: teamId,
            leaderId: teamLeader[0].id,
            memberIds: teamMember.map((member) => member.id),
        };

        try {
            await updateFinaleProjectAPI({
                finaleProjectId: finaleProjectId!,
                data: projectData,
            });

            await updateFinaleTeamAPI({
                teamId: teamId,
                data: teamData,
            });

            navigate(`/project/final/${finaleProjectId}`);
        } catch (error) {
            openModal({
                title: '프로젝트 수정을 실패했습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            console.error(`에러 발생`, error);
        }
    };

    return (
        <FinaleProjectTeam
            mode={'edit'}
            handleAPIButton={handleAPIButton}
            {...props}
        />
    );
};

export default FinalProjectUpdate;
