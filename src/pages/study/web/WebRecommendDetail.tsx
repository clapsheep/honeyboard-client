import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import {
    deleteWebRecommendAPI,
    getWebRecommendDetailAPI,
} from '@/services/study/web';
import { useLocation, useParams } from 'react-router';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { useElementHeight } from '@/hooks/useElementHeight';

const WebRecommendDetail = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();
    const { elementRef, height } = useElementHeight();
    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'web_guide',
        contentId: recommendId!,
        getDetailAPI: getWebRecommendDetailAPI,
        deleteAPI: deleteWebRecommendAPI,
        navigateAfterDelete: '/study/web/concept',
    });

    if (!data) return null;
    return (
        <div className="flex flex-col">
            <Header
                ref={elementRef}
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
            <section
                className="my-6 flex-1 overflow-auto bg-gray-25 px-6 py-4"
                style={{ height: `calc(100vh - ${height}px)` }}
            >
                <ToastViewerComponent
                    content={data.content}
                    viewerId="viewer"
                />
            </section>
        </div>
    );
};

export default WebRecommendDetail;
