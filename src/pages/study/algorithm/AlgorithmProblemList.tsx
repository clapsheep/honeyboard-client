import { Button } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';
import { AlgoProblemCards } from '@/components/templates';
import { AlgoProblemCardSkeletonList } from '@/components/templates';
import { Suspense } from 'react';

const AlgorithmProblem = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const ROUTES = [
        {
            path: 'study/algorithm/concept',
            name: '알고리즘 개념',
            isActive: false,
        },
        {
            path: 'study/algorithm/problem',
            name: '알고리즘 문제풀이',
            isActive: true,
        },
    ];

    return (
        <>
            <Header
                titleProps={{ title: '알고리즘 문제풀이' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button onClick={() => navigate('create')}>
                            문제 생성
                        </Button>
                    </div>
                </div>
            </Header>
            <Suspense fallback={<AlgoProblemCardSkeletonList />}>
                <AlgoProblemCards />
            </Suspense>
        </>
    );
};

export default AlgorithmProblem;
