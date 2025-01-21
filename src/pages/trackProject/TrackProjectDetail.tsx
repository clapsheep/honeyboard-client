import { getTrackProjectDetailAPI } from '@/api/trackAPI';
import { Button } from '@/components/atoms';
import { Header, SubmitSection } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    TrackProjectCards,
} from '@/components/templates';
import { useAuth } from '@/hooks/useAuth';
import { useProjectDetail } from '@/hooks/useProjectDetail';
import { Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const TrackProjectDetail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { trackProjectId } = useParams();
    const { userInfo } = useAuth();

    const data = useProjectDetail({
        getAPI: getTrackProjectDetailAPI,
        requestParam: trackProjectId ? { trackProjectId } : undefined,
    });

    if (!data) {
        navigate(-1);
        return;
    }

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
                            <Button
                                color="red"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                프로젝트 삭제
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('edit');
                                }}
                            >
                                프로젝트 수정
                            </Button>
                        </section>
                    )}

                    <Button
                        onClick={() => {
                            navigate('create');
                        }}
                    >
                        일지 작성
                    </Button>
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
                    <TrackProjectCards boards={data?.boards}></TrackProjectCards>
            </Suspense>
            
        </>
    );
};

export default TrackProjectDetail;
