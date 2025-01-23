import {
    getAlgorithmProblemDetailAPI,
    updateAlgorithmProblemAPI,
} from '@/api/AlgorithmProblemAPI';
import AlgoProblemForm from '@/components/templates/AlgoProblemForm';
import useAlgorithmTag from '@/hooks/useAlgorithmTag';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { AlgorithmProblemDetailResponse } from '@/types/AlgorithmProblem';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const AlgorithmProblemUpdate = () => {
    const { problemId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [data, setData] = useState<AlgorithmProblemDetailResponse>();
    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAlgorithmProblemDetailAPI({
                    problemId: problemId as string,
                });

                setData(response);
                setTitle(response.title || '');
                setUrl(response.url || '');
            } catch (error) {
                console.error('알고리즘 문제 조회에 실패했습니다.', error);
            }
        };

        if (problemId) {
            fetchData();
        }
    }, [problemId]);

    const {
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        onDelete,
        value,
        algoSearch,
        searchResult,
    } = useAlgorithmTag({
        initialAlgoSearch: data?.tags ?? [],
    });

    const handleCancel = () => {
        openModal({
            icon: 'warning',
            title: '수정 취소',
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
            if (!problemId) {
                throw new Error('문제를 찾지 못했습니다.');
            }

            await updateAlgorithmProblemAPI({
                problemId: problemId,
                data: {
                    title,
                    url,
                    tags: algoSearch,
                },
            });

            navigate('/study/algorithm/problem');
        } catch (error) {
            console.error('문제 수정을 실패했습니다.', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const mode = 'edit' as const;

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

export default AlgorithmProblemUpdate;
