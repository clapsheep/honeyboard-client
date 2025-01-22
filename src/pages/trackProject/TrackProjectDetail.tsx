import { getTrackProjectDetailAPI } from '@/api/trackAPI';
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

<<<<<<< HEAD
    console.log(data);
=======
    const teams = data?.teams;
    const userTeam = teams?.find((team) =>
        team.members.some((member) => member.name === userName),
    );
>>>>>>> 78fa130a9c7095af252d8fedbac268bca424a456

    if (!data) {
        return null;
    }

    const handleProjectDelete = () => {
        openModal({
            icon: 'warning',
            title: '프로젝트 삭제',
            subTitle: '정말 삭제하시겠습니까?',
            onConfirmClick: () => {
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

    const handleCreateTeam = () => {
        navigate(`create`);
    };

    const handleCreateBoard = (teamId: string) => {
        navigate(`team/${teamId}/board`);
    };

    const onClick = (teamId: string) => {
        navigate(`/team/${teamId}/board`);
    };

    return (
        <>
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

                    {!userTeam ? (
                        <Button onClick={handleCreateTeam}>팀 생성</Button>
                    ) : (
                        !userTeam.submitted && (
                            <Button
                                onClick={() => handleCreateBoard(userTeam.id)}
                            >
                                일지 작성
                            </Button>
                        )
                    )}
                </div>
            </Header>

            <section className="m-4 mt-6 border bg-white p-4">
                <section className="flex flex-wrap gap-2">
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
                    boards={data?.trackProjectBoardList}
                ></TrackProjectCards>
            </Suspense>
        </>
    );
};

export default TrackProjectDetail;
