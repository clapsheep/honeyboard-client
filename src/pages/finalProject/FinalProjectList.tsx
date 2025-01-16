import { getFinaleProjectListAPI } from '@/api/finaleAPI';
import { Button, NameTag, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, SubmitSection } from '@/components/organisms';
import { ProjectCardSkeletonList } from '@/components/templates';
import FinalListCards from '@/components/templates/FinalListCard';
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

    // 프로젝트 목록을 관리할 상태
    const [projectList, setProjectList] = useState<FinaleProjectListResponse>();

    // useQuery로 데이터를 가져오기
    const { data } = useQuery({
        queryKey: ['finalProject', generationId],
        queryFn: () => getFinaleProjectListAPI({ generationId }),
    });

    // generationId 또는 data가 변경되면 프로젝트 리스트를 업데이트
    useEffect(() => {
        setProjectList(data?.data.projects); // 프로젝트 리스트 업데이트
    }, [generationId, data]); // generationId 또는 data가 변경되면 실행

    const boardDetailNav = (finaleProjectId: string) => {
        navigate(`${finaleProjectId}`);
    };
    // noTeamUsers 배열에서 userInfo.userId가 있는지 확인
    const isUserWithoutTeam = data?.data?.noTeamUsers?.some(
        (user) => user.id === userInfo?.userId,
    );

    return (
        <>
            <Header
                titleProps={{ title: '파이널 프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <TabNavigation routes={ROUTES} />

                    <div className="flex items-end gap-4">
                        {isUserWithoutTeam && (
                            <Button
                                onClick={() => {
                                    navigate('create');
                                }}
                            >
                                팀 생성
                            </Button>
                        )}

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
                <section className="flex flex-wrap gap-2">
                    <SubmitSection
                        project="final"
                        teams={data?.data?.teams}
                        noTeamUsers={data?.data?.noTeamUsers}
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
                    <FinalListCards
                        boards={data?.data?.projects}
                    ></FinalListCards>
                </Suspense>
            </section>
        </>
    );
};

export default FinalProjectList;
