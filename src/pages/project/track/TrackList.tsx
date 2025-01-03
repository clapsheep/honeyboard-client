import { Button, NameTag, SelectOption } from '@/components/atoms';
import { TabNavigation, TeamTag } from '@/components/molecules';
import { Header, ProjectCard } from '@/components/organisms';
import { useGenerationStore } from '@/stores/generationStore';
import { useUserStore } from '@/stores/userStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo } = useUserStore();
    const { generationList } = useGenerationStore();
    const [generation, setGeneration] = useState<string>(
        userInfo?.generationId ?? '',
    );
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
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
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
                {/* 프로젝트 목록 렌더링 */}
                {ProjectList &&
                    ProjectList.map((item, index) => (
                        <ProjectCard
                            key={index}
                            id={item.id}
                            title={item.title}
                            subTitle={item.createAt}
                        />
                    ))}
            </section>
        </div>
    );
};

export default TrackList;
