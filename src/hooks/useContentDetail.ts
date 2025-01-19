import { useModalStore } from '@/stores/modalStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { addBookmarkAPI, deleteBookmarkAPI } from '@/api/bookmarkAPI';
import { ContentType } from '@/types/Bookmark';

interface UseContentDetailProps<U, T> {
    contentType: ContentType; // 북마크 추가, 삭제 및 query 키 결정
    contentId: string; // 컨텐츠의 Id
    getDetailAPI: (req: U) => Promise<T>; // 컨텐츠 상세 조회 API
    deleteAPI: (req: U) => Promise<unknown>; // 컨텐츠 삭제 API
    navigateAfterDelete: string; // 삭제 후 이동할 경로
    requestParam: U; // API 요청 파라미터 정의, 때때마다 키 값이 다름, 갯수도 다름
}

// 공통 인터페이스 정의
interface BaseContentDetail {
    bookmarked: boolean;
}

// T는 반드시 BaseContentDetail을 확장해야 함을 명시
export const useContentDetail = <U, T extends BaseContentDetail>({
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
    const queryClient = useQueryClient();

    const { data } = useQuery<T>({
        queryKey: [contentType, contentId],
        queryFn: () => getDetailAPI(requestParam),
    });
    console.log('called useContentDetail', data);

    const bookmarkMutation = useMutation({
        mutationFn: async ({ isBookmarked }: { isBookmarked: boolean }) => {
            if (isBookmarked) {
                return deleteBookmarkAPI({ contentType, contentId });
            }
            return addBookmarkAPI({ contentType, contentId });
        },
        onMutate: async ({ isBookmarked }) => {
            // 이전 쿼리 데이터를 백업
            const previousData = queryClient.getQueryData([
                contentType,
                contentId,
            ]);

            // 옵티미스틱 업데이트
            queryClient.setQueryData<T>([contentType, contentId], (old) =>
                old ? { ...old, bookmarked: !isBookmarked } : old,
            );

            return { previousData };
        },
        onError: (err, variables, context) => {
            // 에러 발생 시 이전 상태로 롤백
            queryClient.setQueryData(
                [contentType, contentId],
                context?.previousData,
            );
        },
    });

    const handleDelete = async () => {
        try {
            openModal({
                title: '컨텐츠 삭제',
                icon: 'warning',
                subTitle: '정말로 삭제하시겠습니까?',
                onConfirmClick: async () => {
                    await deleteAPI(requestParam);
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
        bookmarkMutation.mutate({ isBookmarked: data?.bookmarked ?? false });
    };

    return {
        data,
        handleDelete,
        handleEdit,
        handleLike,
    };
};
