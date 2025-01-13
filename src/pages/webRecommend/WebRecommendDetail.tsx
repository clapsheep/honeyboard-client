import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    getWebRecommendDetailAPI,
    deleteWebRecommendAPI,
} from '@/api/WebRecommendAPI';
import { useLocation, useParams } from 'react-router';

const WebRecommendDetail = () => {
    const { pathname } = useLocation();
    const { recommendId } = useParams();
    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'web_guide',
        contentId: recommendId!,
        requestParam: {recommendId:recommendId!},
        getDetailAPI: getWebRecommendDetailAPI,
        deleteAPI: deleteWebRecommendAPI,
        navigateAfterDelete: '/study/web/recommend',
    });

    if (!data) return null;
    return (
        <>
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

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default WebRecommendDetail;
