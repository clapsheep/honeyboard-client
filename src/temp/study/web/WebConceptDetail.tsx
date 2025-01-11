import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useContentDetail } from '@/hooks/useContentDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import {
    deleteWebConceptAPI,
    getWebConceptDetailAPI,
} from '@/services/study/web';
import { useLocation, useParams } from 'react-router';

const WebConceptDetail = () => {
    const { pathname } = useLocation();
    const { conceptId } = useParams();

    const { data, handleDelete, handleEdit, handleLike } = useContentDetail({
        contentType: 'web_guide',
        contentId: conceptId!,
        getDetailAPI: getWebConceptDetailAPI,
        deleteAPI: deleteWebConceptAPI,
        navigateAfterDelete: '/study/web/concept',
    });

    if (!data) return null;
    return (
        <>
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

            <ToastViewerComponent content={data.content} viewerId="viewer" />
        </>
    );
};

export default WebConceptDetail;
