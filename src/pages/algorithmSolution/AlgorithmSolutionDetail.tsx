import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import { useLocation, useParams } from 'react-router';
import { AlgoInfo } from '@/components/molecules';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    getAlgorithmSolutionDetailAPI,
    deleteAlgorithmSolutionAPI,
} from '@/api/AlgorithmSolutionAPI';
import { useAuth } from '@/hooks/useAuth';

const AlgorithmSolutionDetail = () => {
    const { pathname } = useLocation();
    const { problemId, solutionId } = useParams();

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'ALGO_SOLUTION',
        contentId: solutionId!,
        requestParam: { problemId: problemId!, solutionId: solutionId! },
        getDetailAPI: getAlgorithmSolutionDetailAPI,
        deleteAPI: deleteAlgorithmSolutionAPI,
        navigateAfterDelete: `/study/algorithm/problem/${problemId}`,
    });

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const isAdmin = userInfo?.role === 'ADMIN';
    const isAuthor = data?.authorId === userId;

    if (!data) return null;

    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    description: { '풀이 설명': data.summary },
                    author: data.name,
                    bookmarked: data.bookmarked,
                    onClickLike: handleLike,
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-start justify-between">
                    <AlgoInfo
                        memory={data.memory}
                        runtime={data.runtime}
                        languageId={data.languageId}
                        readOnly={true}
                    />
                    <div className="flex gap-4">
                        {(isAdmin || isAuthor) && (
                            <div className="flex gap-4">
                                <Button color="red" onClick={handleDelete}>
                                    풀이 삭제
                                </Button>
                                <Button onClick={handleEdit}>풀이 수정</Button>
                            </div>
                        )}
                    </div>
                </div>
            </Header>
            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default AlgorithmSolutionDetail;
