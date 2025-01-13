import { useAuth } from '@/hooks/useAuth.ts';
import { useGenerationStore } from '@/stores/generationStore.ts';
import { useLocation, useNavigate } from 'react-router';
import { Suspense, useState } from 'react';
import { Header } from '@/components/organisms';
import { TabNavigation } from '@/components/molecules';
import { Button, SelectOption } from '@/components/atoms';
import { convertSelectType } from '@/utils/convertSelectType.ts';
import {
    ProjectCardSkeletonList,
    AlgorithmGuideCards,
} from '@/components/templates';

const AlgorithmGuideList = () => {
    const { userInfo } = useAuth();
    const { generationList } = useGenerationStore();
    const navigate = useNavigate();
    const [generationId, setGenerationId] = useState<string | null>(
        userInfo!.generationId,
    );
    const { pathname } = useLocation();
    const ROUTES = [
        {
            path: 'study/algorithm/concept',
            name: '알고리즘 개념',
            isActive: true,
        },
        {
            path: 'study/algorithm/problem',
            name: '알고리즘 문제 풀이',
            isActive: false,
        },
    ];

    return (
        <>
            <Header
                titleProps={{ title: '알고리즘 개념' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-between">
                    <TabNavigation routes={ROUTES} />
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                navigate('create');
                            }}
                        >
                            글작성
                        </Button>
                        <SelectOption
                            id={'generation'}
                            name={'generation'}
                            options={convertSelectType(generationList)}
                            placeholder={'기수'}
                            value={generationId}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <Suspense fallback={<ProjectCardSkeletonList />}>
                <AlgorithmGuideCards generationId={generationId} />
            </Suspense>
        </>
    );
};

export default AlgorithmGuideList;
