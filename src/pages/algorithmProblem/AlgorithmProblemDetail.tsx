import { Button } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
    AlgoDetailCards,
    AlgoDetailCardSkeletonList,
} from '@/components/templates';
import {
    getAlgorithmProblemDetailAPI,
    deleteAlgorithmProblemAPI,
} from '@/api/AlgorithmProblemAPI';
import { useContentDetail } from '@/hooks/useContentDetail';
import { Suspense } from 'react';

const AlgorithmProblemDetail = () => {
    const { pathname } = useLocation();
    const { problemId } = useParams();
    const navigate = useNavigate();
    const { data, handleDelete, handleEdit } = useContentDetail({
        contentType: 'ALGO_SOLUTION',
        contentId: problemId!,
        requestParam: { problemId: problemId! },
        getDetailAPI: getAlgorithmProblemDetailAPI,
        deleteAPI: deleteAlgorithmProblemAPI,
        navigateAfterDelete: '/study/algorithm/problem',
    });
    if (!data) return null;
    const ROUTES = [
        {
            path: pathname,
            name: '풀이 목록',
            isActive: true,
        },
    ];
    if (!problemId) {
        return <p>문제 ID가 없습니다.</p>;
    }

    return (
        <div>
            <Header
                titleProps={{
                    title: data.title,
                    description: { 문제링크: data.url },
                    isLink: true,
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="pt-6">
                        <TabNavigation routes={ROUTES} />
                    </div>
                    <div className="flex items-end gap-4">
                        <Button color="red" onClick={handleDelete}>
                            문제 삭제
                        </Button>
                        <Button onClick={handleEdit}>문제 수정</Button>
                        <Button onClick={() => navigate('create')}>
                            풀이 작성
                        </Button>
                    </div>
                </div>
            </Header>
            <Suspense fallback={<AlgoDetailCardSkeletonList />}>
                <AlgoDetailCards problemId={problemId} />
            </Suspense>
        </div>
    );
};

export default AlgorithmProblemDetail;
