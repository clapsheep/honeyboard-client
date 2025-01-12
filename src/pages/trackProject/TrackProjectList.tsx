import { Suspense, useState, useEffect } from 'react';
import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, ProjectCard } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { TrackProjectListResponse } from '@/types/TrackProject';
import { ProjectCardSkeletonList } from '@/components/templates';
import { useQuery } from '@tanstack/react-query';
import { getTrackProjectListAPI } from '@/api/trackAPI';
import { useLocation, useNavigate } from 'react-router';

const TrackProjectList = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { generationList } = useGenerationStore();
    const { pathname } = useLocation();
    const [generationId, setGenerationId] = useState<string | null>(
        userInfo?.generationId || null,
    );

    // 데이터를 가져옴
    const { data } = useQuery({
        queryKey: ['trackProjects', generationId],
        queryFn: () => getTrackProjectListAPI({ generationId }),
    });

    const [projectList, setProjectList] = useState<TrackProjectListResponse>();

    // generationId가 변경될 때마다 데이터 조회
    useEffect(() => {
        setProjectList(data?.data); // 데이터를 비동기적으로 업데이트
    }, [generationId, data]); // generationId 또는 data가 변경될 때마다 실행

    const ROUTES = [
        { path: 'project/track', name: '프로젝트', isActive: true },
    ];

    return (
        <>
            <Header
                titleProps={{ title: '관통프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        {userInfo?.role === 'ADMIN' && (
                            <Button
                                onClick={() => {
                                    navigate('create');
                                }}
                            >
                                프로젝트 생성
                            </Button>
                        )}
                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            value={generationId}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>

            <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Suspense로 로딩 상태 처리 */}
                <Suspense fallback={<ProjectCardSkeletonList />}>
                    {projectList && projectList.length > 0 ? (
                        projectList.map((item) => (
                            <ProjectCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                subTitle={item.createdAt}
                                img={item.thumbnail}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            <p>게시글이 없습니다.</p>
                        </div>
                    )}
                </Suspense>
            </section>
        </>
    );
};

export default TrackProjectList;
