import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, ProjectCard } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProjectCardSkeletonList } from '@/components/templates';
import { useSuspenseQuery } from '@tanstack/react-query';
import useTrackProjectList from '@/hooks/useTrackProjectList';

const TrackProjectList = () => {
    const { userInfo } = useAuth();
    const { generationList } = useGenerationStore();
    const navigate = useNavigate();
    const [generationId, setGenerationId] = useState<string | null>(
        userInfo!.generationId,
    );

    const { data: projectList } = useTrackProjectList();

    // const ProjectList = [
    //     {
    //         title: '무슨무슨 서비스',
    //         createAt: '2025-01-04',
    //         id: '1',
    //     },
    //     {
    //         title: '무슨무슨 서비스2',
    //         createAt: '2025-01-04',
    //         id: '2',
    //     },
    //     {
    //         title: '무슨무슨 서비스3',
    //         createAt: '2024-12-05',
    //         id: '3',
    //     },
    //     {
    //         title: '무슨무슨 서비스4',
    //         createAt: '2025-01-01',
    //         id: '4',
    //     },
    //     {
    //         title: '무슨무슨 서비스4',
    //         createAt: '2025-01-04',
    //         id: '5',
    //     },
    // ];
    const ROUTES = [
        { path: 'project/track', name: '프로젝트', isActive: true },
    ];

    return (
        <div>
            <Header titleProps={{ title: '관통프로젝트' }}>
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        {userInfo?.role === 'ADMIN' ? (
                            <Button
                                onClick={() => {
                                    alert('create');
                                }}
                            >
                                프로젝트 생성
                            </Button>
                        ) : null}
                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            defaultValue={generationId}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            {/* <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {ProjectList &&
                    ProjectList.map((item, index) => (
                        <ProjectCard
                            key={index}
                            id={item.id}
                            title={item.title}
                            subTitle={item.createAt}
                        />
                    ))}
            </section> */}
            <Suspense fallback={<ProjectCardSkeletonList />}>
                {projectList &&
                    projectList.map((item) => (
                        <ProjectCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            subTitle={item.createdAt} // 예시: createdAt을 서브타이틀로 사용
                        />
                    ))}
            </Suspense>
        </div>
    );
};

export default TrackProjectList;

/*
export type TrackProjectListResponse = Pick<
    TrackProject,
    'id' | 'title' | 'thumbnail' | 'createdAt'
>[];
*/
