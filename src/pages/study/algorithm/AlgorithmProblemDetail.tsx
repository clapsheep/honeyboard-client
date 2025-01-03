import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import { useLocation, useParams } from 'react-router';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    getAlgorithmSolutionAPI,
    deleteAlgorithmSolutionAPI,
} from '@/services/study/algorithm';

const AlgorithmProblemDetail = () => {
    const { pathname } = useLocation();
    const { problemId } = useParams();

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
            contentType: 'algo_solution',
            contentId: problemId!,
            getDetailAPI: getAlgorithmSolutionAPI,
            deleteAPI: deleteAlgorithmSolutionAPI,
            navigateAfterDelete: '/study/web/problem',
        });

        if (!data) return null;
        return (
            <>
                <Header
                    titleProps={{
                        title: data.title,
                        description: {'풀이 설명': data.summary},
                        author: data.Author,
                        onClickLike: handleLike,
                    }}
                    BreadcrumbProps={{ pathname }}
                >
                    <div className="flex justify-end">
                        <div className="flex gap-4">
                            <Button color="red" onClick={handleDelete}>
                                풀이 삭제
                            </Button>
                            <Button onClick={handleEdit}>풀이 수정</Button>
                        </div>
                    </div>
                </Header>
                <ToastViewerComponent
                        content={data.content}
                        viewerId="viewer"
                />
            </>
        );
    };

export default AlgorithmProblemDetail;
