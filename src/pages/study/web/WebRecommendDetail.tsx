import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import {
    deleteWebRecommendAPI,
    getWebRecommendDetailAPI,
} from '@/services/study/web';
import { useLocation, useParams } from 'react-router';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';

const WebRecommendDetail = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'web_guide',
        contentId: recommendId!,
        getDetailAPI: getWebRecommendDetailAPI,
        deleteAPI: deleteWebRecommendAPI,
        navigateAfterDelete: '/study/web/concept',
    });

    if (!data) return null;
    return (
        <div className="max-h-screen min-h-screen">
            <Header
                titleProps={{
                    title: data.title,
                    description: { '사이트 주소 ': data.url },
                    onClickLike: handleLike,
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleDelete}>
                            게시글 삭제
                        </Button>
                        <Button onClick={handleEdit}>게시글 수정</Button>
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

export default WebRecommendDetail;
