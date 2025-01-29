import { createAlgorithmProblemAPI } from '@/api/AlgorithmProblemAPI';
import AlgoProblemForm from '@/components/templates/AlgoProblemForm';
import useAlgorithmTag from '@/hooks/useAlgorithmTag';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const AlgorithmProblemCreate = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    const {
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        onDelete,
        value,
        algoSearch,
        searchResult,
    } = useAlgorithmTag({
        initialAlgoSearch: [],
    });

    const handleCancel = () => {
        openModal({
            icon: 'warning',
            title: '작성 취소',
            subTitle: '정말 취소하시겠습니까?',
            onConfirmClick: () => {
                navigate(-1);
                closeModal();
            },
            onCancelClick: () => {
                closeModal();
            },
        });
    };

    const handleSubmit = async () => {
        if (!userId) {
            openModal({
                title: '로그인 후 이용해주세요.',
                onCancelClick: () => {
                    navigate('/login');
                    closeModal();
                },
            });
            return;
        }

        try {
            await createAlgorithmProblemAPI({
                data: {
                    title,
                    url,
                    tags: algoSearch,
                },
            });

            navigate('/study/algorithm/problem');
        } catch (error) {
            console.error('문제 생성을 실패했습니다.', error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '이미 등록된 문제입니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
            } else {
                openModal({
                    title: '게시글 작성을 실패했습니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
            }
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const mode = 'create' as const;

    const props = {
        mode,
        pathname,
        title,
        url,
        handleCancel,
        handleSubmit,
        handleTitleChange,
        handleUrlChange,
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        onDelete,
        value,
        algoSearch,
        searchResult,
    };

    return <AlgoProblemForm {...props} />;
};

export default AlgorithmProblemCreate;
