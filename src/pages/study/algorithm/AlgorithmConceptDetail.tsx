import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    deleteAlgorithmConceptAPI,
    getAlgorithmConceptDetailAPI,
} from '@/services/study/algorithm';
import { useLocation, useParams } from 'react-router';

const AlgorithmConceptDetail = () => {
    const { pathname } = useLocation();
    const { conceptId } = useParams();

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'algo_guide',
        contentId: conceptId!,
        getDetailAPI: getAlgorithmConceptDetailAPI,
        deleteAPI: deleteAlgorithmConceptAPI,
        navigateAfterDelete: '/study/Algorithm/concept',
    });

    if (!data) return null;
    return (
        <div className="max-h-screen min-h-screen">
            <Header
                titleProps={{ title: data.title, onClickLike: handleLike }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleDelete}>
                            글 삭제
                        </Button>
                        <Button onClick={handleEdit}>글 수정</Button>
                    </div>
                </div>
            </Header>
            <section className="my-6 max-h-[calc(100vh-200px)] flex-1 overflow-auto bg-gray-25 px-6 py-4">
                <ToastViewerComponent
                    content={data.content}
                    viewerId="viewer"
                />
            </section>
        </div>
    );
};

export default AlgorithmConceptDetail;
