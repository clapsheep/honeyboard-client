import { deleteWebGuideAPI, getWebGuideDetailAPI } from '@/api/WebGuideAPI';
import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';

import { useLocation, useParams } from 'react-router';
const WebGuideDetail = () => {
    const { pathname } = useLocation();
    const { guideId } = useParams();
    const { userInfo } = useAuth();
    const userRole = userInfo?.role;

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'WEB_GUIDE',
        contentId: guideId!,
        requestParam: { guideId: guideId! },
        getDetailAPI: getWebGuideDetailAPI,
        deleteAPI: deleteWebGuideAPI,
        navigateAfterDelete: '/study/web/concept',
    });

    if (!data) return null;
    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    bookmarked: data.bookmarked,
                    onClickLike: handleLike,
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        {userRole === 'ADMIN' && (
                            <Button color="red" onClick={handleDelete}>
                                글 삭제
                            </Button>
                        )}

                        {userRole === 'ADMIN' && (
                            <Button onClick={handleEdit}>글 수정</Button>
                        )}
                    </div>
                </div>
            </Header>

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default WebGuideDetail;
