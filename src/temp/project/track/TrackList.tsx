import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
<<<<<<< HEAD:src/temp/project/track/TrackList.tsx
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
=======
import { Header, ProjectCard } from '@/components/organisms';
>>>>>>> 10563256002d357329e3f61c6bcb4d8266d731bc:src/pages/project/track/TrackList.tsx
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useTrackList from '@/hooks/useTrackList';

const TrackList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo } = useAuth();
    const { generationList } = useGenerationStore();
    const [generation, setGeneration] = useState<string>(
        userInfo?.generationId ?? '',
    );
    //const { data } = useTrackList(generation);

    const ROUTES = [{ path: '/track', name: '프로젝트', isActive: true }];

    const ProjectList = [
        {
            title: '무슨무슨 서비스',
            createAt: '2025-01-04',
            id: '1',
        },
        {
            title: '무슨무슨 서비스2',
            createAt: '2025-01-04',
            id: '2',
        },
        {
            title: '무슨무슨 서비스3',
            createAt: '2024-12-05',
            id: '3',
        },
        {
            title: '무슨무슨 서비스4',
            createAt: '2025-01-01',
            id: '4',
        },
        {
            title: '무슨무슨 서비스4',
            createAt: '2025-01-04',
            id: '5',
        },
    ];
    return (
        <div>
            <Header
                titleProps={{
                    title: '관통 프로젝트',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-between">
                    <TabNavigation routes={ROUTES} />
                    <div className="flex gap-4">
                        {userInfo?.role === 'ADMIN' ? (
                            <Button
                                onClick={() => {
                                    navigate('create');
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
                            defaultValue={generation}
                            onChange={(e) => {
                                setGeneration(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {ProjectList &&
                    ProjectList.map((item, index) => (
                        <ProjectCard
                            key={index}
                            id={item.id}
                            title={item.title}
                            subTitle={item.createAt}
                        />
                    ))}
                {/* 
                {data &&
                    data.length > 0 &&
                    data.map((item: unknown) => (
                        <ProjectCard
                            id={item.id}
                            title={item.title}
                            subTitle={item.createAt}
                        />
                    ))} */}
            </section>
        </div>
    );
};

export default TrackList;
