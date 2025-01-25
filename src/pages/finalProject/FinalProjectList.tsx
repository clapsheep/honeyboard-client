import { getFinaleProjectListAPI } from '@/api/finaleAPI';
import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header, SubmitSection } from '@/components/organisms';
import { ProjectCardSkeletonList } from '@/components/templates';
import FinalListCards from '@/components/templates/FinalListCard';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';

import { convertSelectType } from '@/utils/convertSelectType';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
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

    // useQuery로 데이터를 가져오기
    const { data } = useQuery({
        queryKey: ['finalProject', generationId],
        queryFn: () => getFinaleProjectListAPI({ generationId }),
    });

    const boardDetailNav = (finaleProjectId: string) => {
        navigate(`${finaleProjectId}`);
    };

    const isUserWithoutTeam = data?.noTeamUsers?.some(
        (user) => user.id === userInfo?.userId,
    );

    return (
        <div className='flex flex-col items-center'>
            <Header
                titleProps={{ title: '파이널 프로젝트' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <TabNavigation routes={ROUTES} />

                    <div className="mt-[-5px] flex items-end gap-4">
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

            <section className="flex m-4 mt-6 border bg-white p-4 w-[1400px]">
                <section className="flex flex-wrap gap-2 ">
                    <SubmitSection
                        project="final"
                        teams={data?.teams}
                        noTeamUsers={data?.noTeamUsers}
                        onClick={boardDetailNav}
                    />
                </section>
            </section>

            <section >
                <Suspense fallback={<ProjectCardSkeletonList />}>
                    <FinalListCards boards={data?.projects} />
                </Suspense>
            </section>
        </div>
    );
};

export default FinalProjectList;
