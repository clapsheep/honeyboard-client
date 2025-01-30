import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';

import {
    deleteAlgorithmGuideAPI,
    getAlgorithmGuideDetailAPI,
} from '@/api/AlgorithmGuideAPI.ts';
import { AlgorithmGuideDetailResponse } from '@/types/AlgorithmGuide';
import { useLocation, useParams } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
const AlgorithmGuideDetail = () => {
    const { pathname } = useLocation();
    const { guideId } = useParams();
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const userRole = userInfo?.role;

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail<
        {
            guideId: string;
        },
        AlgorithmGuideDetailResponse
    >({
        contentType: 'ALGO_GUIDE',
        contentId: guideId!,
        requestParam: { guideId: guideId! },
        getDetailAPI: getAlgorithmGuideDetailAPI,
        deleteAPI: deleteAlgorithmGuideAPI,
        navigateAfterDelete: '/study/algorithm/concept',
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
                    {(userId === data.authorId || userRole === 'ADMIN') && (
                        <div className="flex gap-4">
                            <Button color="red" onClick={handleDelete}>
                                글 삭제
                            </Button>
                            <Button onClick={handleEdit}>글 수정</Button>
                        </div>
                    )}
                </div>
            </Header>

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default AlgorithmGuideDetail;
