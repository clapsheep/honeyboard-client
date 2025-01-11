import {
    getAlgorithmProblemDetailAPI,
    updateAlgorithmProblemAPI,
} from '@/api/algorithmProblemAPI';
import AlgoProblemForm from '@/components/templates/AlgoProblemForm';
import useAlgorithmTag from '@/hooks/useAlgorithmTag';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const AlgorithmProblemUpdate = () => {
    const { problemId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { openModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    const { data } = useQuery({
        queryKey: ['algo_problem', problemId],
        queryFn: () =>
            getAlgorithmProblemDetailAPI({ problemId: problemId as string }),
    });

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
        navigate(-1);
    };

    const handleSubmit = async () => {
        if (!userId) {
            openModal({
                title: '로그인 후 이용해주세요.',
                onCancelClick: () => {
                    navigate('/login');
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
