import { getFinaleProjectListAPI } from '@/api/finaleAPI';
import { Button, NameTag, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, ProjectCard, SubmitSection } from '@/components/organisms';
import { ProjectCardSkeletonList } from '@/components/templates';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';
import { FinaleProjectListResponse } from '@/types/FinaleProject';
import { convertSelectType } from '@/utils/convertSelectType';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const FinalProjectList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { generationList } = useGenerationStore();

    const { userInfo } = useAuth();
    const [generationId, setGenerationId] = useState<string | null>(
        userInfo?.generationId || null,
    );

    const ROUTES = [
        { path: 'project/final', name: '프로젝트', isActive: true },
    ];

    // useQuery를 통해 데이터를 가져오고 에러 핸들링 추가
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['finalProject'],
        queryFn: () => getFinaleProjectListAPI({ generationId }),
    });

    const [finalList, setFinalList] = useState<FinaleProjectListResponse>();

    useEffect(() => {
        setFinalList(data?.data);
    }, [generationId, data]);

    const boardDetailNav = (finaleProjectId: string) => {
        navigate(`${finaleProjectId}`);
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
                            options={convertSelectType(generationList)}
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
                        teams={data?.teams}
                        noTeamUsers={data?.noTeamUsers}
                        onClick={boardDetailNav}
                    />
                </section>
                <section className="flex w-full gap-2 pt-2">
                    {data?.noTeamUsers &&
                        data?.noTeamUsers.map((item, index) => (
                            <NameTag key={index} color="gray">
                                {item.name}
                            </NameTag>
                        ))}
                </section>
            </section>

            <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Suspense fallback={<ProjectCardSkeletonList />}>
                    {isLoading ? (
                        <div>로딩 중...</div>
                    ) : isError ? (
                        <div className="col-span-full text-center text-red-500">
                            에러가 발생했습니다:{' '}
                            {error instanceof Error
                                ? error.message
                                : '알 수 없는 오류'}
                        </div>
                    ) : finalList?.projects && finalList.projects.length > 0 ? (
                        finalList.projects.map((item) => (
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

export default FinalProjectList;
