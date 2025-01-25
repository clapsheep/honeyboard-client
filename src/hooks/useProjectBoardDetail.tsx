import { useNavigate } from 'react-router';
import { useModalStore } from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';

interface UseProjectBoardDetailProps<U, T> {
    projectType: 'track' | 'final';
    boardId: string;
    getDetailAPI: (req: U) => Promise<T>;
    deleteAPI: (req: U) => Promise<unknown>;
    requestParam: U;
    navigateAfterDelete: string;
    navigateToEditTeam?: string;
}

export const useProjectBoardDetail = <U, T>({
    projectType,
    boardId,
    getDetailAPI,
    deleteAPI,
    requestParam,
    navigateAfterDelete,
    navigateToEditTeam,
}: UseProjectBoardDetailProps<U, T>) => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModalStore();

    const { data } = useQuery<T>({
        queryKey: [projectType],
        queryFn: () => getDetailAPI(requestParam),
        staleTime: 5 * 1000,
    });

    const handleDelete = async () => {
        try {
            openModal({
                title: '일지 삭제',
                icon: 'warning',
                subTitle: '정말로 삭제하시겠습니까?',
                onConfirmClick: async () => {
                    await deleteAPI(requestParam);
                    navigate(navigateAfterDelete);
                    closeModal();
                },
                onCancelClick: () => {
                    closeModal();
                },
            });
        } catch (error) {
            console.error('게시글 삭제에 실패했습니다.', error);
        }
    };

    const handleEdit = () => {
        navigate('edit');
    };

    const handleEditTeam = () => {
        if (!navigateToEditTeam) return;
        navigate(navigateToEditTeam);
    };

    // const handleDownloadPDF = async () => {
    //     try {
    //         await downloadPdfAPI(requestParamPDF);
    //     } catch (error) {
    //         console.error('PDF 다운로드에 실패했습니다.', error);
    //     }
    // };

    return {
        data,
        handleDelete,
        handleEdit,
        handleEditTeam,
    };
};
