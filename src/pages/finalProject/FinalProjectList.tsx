import { Button, NameTag, SelectOption } from '@/components/atoms';
import { TabNavigation, TeamTag } from '@/components/molecules';
import { Header, ProjectCard, SubmitSection } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const FinalProjectList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { userInfo } = useAuth();
    const [generationId, setGenerationId] = useState<string | null>(
        userInfo?.generationId || null,
    );

    const ROUTES = [
        { path: 'project/final', name: '프로젝트', isActive: true },
    ];
    const GENERATION_OPTIONS = [
        { value: '13', label: '13기' },
        { value: '12', label: '12기' },
        { value: '11', label: '11기' },
    ];

    const ProjectList = [
        {
            title: '무슨무슨 서비스',
            subTitle: '프로젝트 한줄소개',
            id: '1',
            teams: ['박수양', '지유림', '서주원'],
        },
        {
            title: '무슨무슨 서비스2',
            subTitle: '프로젝트 한줄소개2',
            id: '2',
            teams: ['강지은', '강수진', '김종명'],
        },
        {
            title: '무슨무슨 서비스3',
            subTitle: '프로젝트 한줄소개3',
            id: '3',
            teams: ['김유정', '윤이영', '정예영'],
        },
        {
            title: '무슨무슨 서비스4',
            subTitle: '프로젝트 한줄소개4',
            id: '4',
            teams: ['박성문', '한재서', '홍길동'],
        },
        {
            title: '무슨무슨 서비스4',
            subTitle: '프로젝트 한줄소개4',
            id: '5',
            teams: ['김성문', '이재서', '용길동'],
        },
    ];

    const boardDetailNav = (teamId: string) => {
        navigate(`/team/${teamId}/board`);
    };

    return (
        <>
            <Header
                titleProps={{ title: '파이널 프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button
                            onClick={() => {
                                navigate('create');
                            }}
                        >
                            팀 생성
                        </Button>

                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            value={generationId}
                            options={GENERATION_OPTIONS}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>

            <section className="m-4 mt-6 border bg-white p-4">
                <div className="pb-2 text-xl font-semibold">
                    오늘의 제출현황
                </div>
                <section className="flex flex-wrap gap-2">
                    <SubmitSection
                        project="final"
                        teams={data.teams}
                        noTeamUsers={data?.noTeamUsers}
                        onClick={boardDetailNav}
                    />
                </section>
                <section className="flex w-full gap-2 pt-2">
                    {RemainUser &&
                        RemainUser.map((item, index) => (
                            <NameTag key={index} color="gray">
                                {item.name}
                            </NameTag>
                        ))}
                </section>
            </section>

            <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* 프로젝트 목록 렌더링 */}
                {ProjectList &&
                    ProjectList.map((item, index) => (
                        <ProjectCard
                            key={index}
                            id={item.id}
                            title={item.title}
                            subTitle={item.subTitle}
                            teams={item.teams}
                        />
                    ))}
            </section>
        </>
    );
};

export default FinalProjectList;
