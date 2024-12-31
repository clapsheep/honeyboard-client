import { Button } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';

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
        <div>
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
                            글작성
                        </Button>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default AlgorithmProblem;
