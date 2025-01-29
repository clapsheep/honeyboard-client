import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    getWebRecommendDetailAPI,
    deleteWebRecommendAPI,
} from '@/api/WebRecommendAPI';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, useParams } from 'react-router';

const WebRecommendDetail = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();
    const { userInfo } = useAuth();
    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'WEB_RECOMMEND',
        contentId: recommendId!,
        requestParam: { recommendId: recommendId! },
        getDetailAPI: getWebRecommendDetailAPI,
        deleteAPI: deleteWebRecommendAPI,
        navigateAfterDelete: '/study/web/recommend',
    });

    if (!data) return null;
    
    const userId = userInfo?.userId;
    const isAuthor = data.authorId === userId;
    const isAdmin = userInfo?.role === 'ADMIN';

    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    description: { '사이트 주소 ': data.url },
                    bookmarked: data.bookmarked,
                    isLink: true,
                    onClickLike: handleLike,
                }}
                BreadcrumbProps={{ pathname }}
            >
                {(isAdmin || isAuthor) && (
                    <div className="flex justify-end">
                        <div className="flex gap-4">
                            <Button color="red" onClick={handleDelete}>
                                게시글 삭제
                            </Button>
                            <Button onClick={handleEdit}>게시글 수정</Button>
                        </div>
                    </div>
                )}
            </Header>

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default WebRecommendDetail;
