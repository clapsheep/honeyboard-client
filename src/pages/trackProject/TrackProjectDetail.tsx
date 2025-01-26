import {
    deleteTrackProjectAPI,
    getTrackProjectDetailAPI,
} from '@/api/trackAPI';
import { Button } from '@/components/atoms';
import { Header, SubmitSection } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    TrackProjectCards,
} from '@/components/templates';
import { useAuth } from '@/hooks/useAuth';
import { useProjectDetail } from '@/hooks/useProjectDetail';
import { useModalStore } from '@/stores/modalStore';
import { Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const TrackProjectDetail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { trackProjectId } = useParams();
    const { userInfo } = useAuth();
    const userName = userInfo?.name;

    const { openModal, closeModal } = useModalStore();

    const data = useProjectDetail({
        getAPI: getTrackProjectDetailAPI,
        requestParam: trackProjectId ? trackProjectId : undefined,
    });

    const teams = data?.teams;
    const userTeam = teams?.find((team) =>
        team.members.some((member) => member.name === userName),
    );

    if (!data) {
        return null;
    }

    const handleProjectDelete = () => {
        openModal({
            icon: 'warning',
            title: '프로젝트 삭제',
            subTitle: '정말 삭제하시겠습니까?',
            onConfirmClick: async () => {
                await deleteTrackProjectAPI(trackProjectId!);
                navigate('/project/track');
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

    const handleCreateTeam = () => {
        navigate(`create`);
    };

    const handleCreateBoard = (teamId: string) => {
        navigate(`team/${teamId}/board`);
    };

    const onClick = (teamId: string, boardId: string) => {
        if (!boardId) {
            openModal({
                title: '게시글이 없습니다.',
                onCancelClick: () => {
                    closeModal();
                },
            });
        } else {
            navigate(
                `/project/track/${trackProjectId}/team/${teamId}/board/${boardId}`,
            );
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Header
                titleProps={{
                    title: data?.title,
                    subTitle: { '프로젝트 목표': data?.objective },
                    description: { '프로젝트 설명': data?.description },
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-end gap-4">
                    {userInfo?.role === 'ADMIN' && (
                        <section className="flex gap-4">
                            <Button color="red" onClick={handleProjectDelete}>
                                프로젝트 삭제
                            </Button>
                            <Button onClick={handleProjectEdit}>
                                프로젝트 수정
                            </Button>
                        </section>
                    )}

                    {userInfo?.role !== 'ADMIN' &&
                        (userTeam ? (
                            !userTeam.submitted && (
                                <Button
                                    onClick={() =>
                                        handleCreateBoard(userTeam.id)
                                    }
                                >
                                    일지 작성
                                </Button>
                            )
                        ) : (
                            <Button onClick={handleCreateTeam}>팀 생성</Button>
                        ))}
                </div>
            </Header>

            <section className="m-4 mt-6 flex w-full border bg-white p-4">
                <section className="flex w-full flex-wrap gap-2">
                    <SubmitSection
                        project="track"
                        teams={data?.teams}
                        noTeamUsers={data?.noTeamUsers}
                        onClick={onClick}
                    />
                </section>
            </section>

            <Suspense fallback={<ProjectCardSkeletonList />}>
                <TrackProjectCards
                    trackId={data.id}
                    teams={data.teams}
                    boards={data?.boards}
                ></TrackProjectCards>
            </Suspense>
        </div>
    );
};

export default TrackProjectDetail;
