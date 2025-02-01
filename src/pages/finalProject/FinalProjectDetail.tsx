import { Suspense } from 'react';
import { Header } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { ProjectCardSkeletonList } from '@/components/templates';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useModalStore } from '@/stores/modalStore';
import { FinalProjectDetailCards } from '@/components/templates';
import {
    getFinaleProjectDetailAPI,
    deleteFinaleProjectAPI,
} from '@/api/finaleAPI';
import { useQuery } from '@tanstack/react-query';
import { NameTag } from '@/components/atoms';

const FinalProjectDetail = () => {
    const { pathname } = useLocation();
    const { finaleProjectId } = useParams();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();

    const { data: data } = useQuery({
        queryKey: ['finaleProject', finaleProjectId],
        queryFn: async () => {
            if (!finaleProjectId) throw new Error('Project ID is required');
            const data = await getFinaleProjectDetailAPI({
                finaleProjectId,
            });
            return data;
        },
        enabled: !!finaleProjectId,
    });

    const isTeamMember = data?.members?.some(
        (member) => member.id === userInfo?.userId,
    );
    const isTeamLeader = data?.members?.some(
        (member) => member.id === userInfo?.userId && member.role === 'LEADER',
    );
    const finaleTeamId = data?.finaleTeamId;

    const handleProjectDelete = () => {
        if (!finaleProjectId || !finaleTeamId) return;

        openModal({
            icon: 'warning',
            title: '프로젝트 삭제',
            subTitle: '정말 삭제하시겠습니까?',
            onConfirmClick: async () => {
                await deleteFinaleProjectAPI({
                    finaleProjectId,
                    finaleTeamId,
                });
                navigate(-1);
                closeModal();
            },
            onCancelClick: () => {
                closeModal();
            },
        });
    };

    const handleProjectEdit = () => {
        navigate('edit');
    };

    const handleCreateBoard = () => {
        if (data?.finaleTeamId) {
            navigate(`/project/final/${finaleProjectId}/board/create`);
        }
    };

    if (!data) {
        return null;
    }

    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    subTitle: { '프로젝트 목표': data.description },
                    description: { 'Git 주소': data.url },
                    isLink: true,
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {data.members.map((member) => (
                            <NameTag key={member.id} isLeader={member.role}>
                                {member.name}
                            </NameTag>
                        ))}
                    </div>
                    {(userInfo?.role === 'ADMIN' ||
                        isTeamMember ||
                        isTeamLeader) && (
                        <section className="flex gap-4">
                            {(userInfo?.role === 'ADMIN' ||
                                isTeamLeader ||
                                isTeamMember) && (
                                <>
                                    <Button
                                        color="red"
                                        onClick={handleProjectDelete}
                                    >
                                        프로젝트 삭제
                                    </Button>
                                    <Button onClick={handleProjectEdit}>
                                        프로젝트 수정
                                    </Button>
                                </>
                            )}
                            {(isTeamLeader || isTeamMember) && (
                                <Button onClick={handleCreateBoard}>
                                    일지 작성
                                </Button>
                            )}
                        </section>
                    )}
                </div>
            </Header>

            <Suspense fallback={<ProjectCardSkeletonList />}>
                {data.boards && (
                    <FinalProjectDetailCards
                        boards={data.boards}
                        finaleProjectId={finaleProjectId!}
                    />
                )}
            </Suspense>
        </>
    );
};

export default FinalProjectDetail;
