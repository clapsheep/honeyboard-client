import { useModalStore } from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { addBookmarkAPI } from '@/api/bookmarkAPI';

interface UseContentDetailProps<U, T> {
    contentType: 'web_recommend' | 'web_guide' | 'algo_solution' | 'algo_guide';
    contentId: string;
    getDetailAPI: (req: U) => Promise<T>;
    deleteAPI: (req: U) => Promise<unknown>;
    navigateAfterDelete: string;
    requestParam: U;
}

export const useContentDetail = <U, T>({
    contentType,
    contentId,
    getDetailAPI,
    deleteAPI,
    navigateAfterDelete,
    requestParam,
}: UseContentDetailProps<U, T>) => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { openModal, closeModal } = useModalStore();

    const { data } = useQuery<T>({
        queryKey: [contentType, contentId],
        queryFn: () => getDetailAPI(requestParam),
    });

    const handleDelete = async () => {
        try {
            openModal({
                title: '컨텐츠 삭제',
                icon: 'warning',
                subTitle: '정말로 삭제하시겠습니까?',
                onConfirmClick: async () => {
                    await deleteAPI(requestParam);
                    closeModal();
                    navigate(navigateAfterDelete);
                },
                onCancelClick: () => {
                    closeModal();
                },
            });
        } catch (error) {
            console.error('삭제 실패', error);
        }
    };

    const handleEdit = () => {
        navigate('edit');
    };

    const handleLike = () => {
        if (!userInfo) return;
        addBookmarkAPI({
            id: userInfo.userId,
            contentType,
            contentId,
        });
    };

    return {
        data,
        handleDelete,
        handleEdit,
        handleLike,
    };
};
