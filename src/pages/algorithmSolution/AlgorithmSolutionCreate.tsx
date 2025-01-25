import AlgorithmSolutionForm from '@/components/templates/AlgorithmSolutionForm';
import useToastEditor from '@/hooks/useToastEditor';
import { useAuth } from '@/hooks/useAuth';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createAlgorithmSolutionAPI } from '@/api/AlgorithmSolutionAPI';

interface SolutionDetail {
    runtime: string;
    memory: string;
    languageId: string;
}

const AlgorithmSolutionCreate = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { problemId } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [solutionDetail, setSolutionDetail] = useState<SolutionDetail>({
        memory: '',
        runtime: '',
        languageId: '1',
    });

    const { openModal, closeModal } = useModalStore();

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'algorithmSolutionEditor',
        initialContent: '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            openModal({
                title: '제목을 입력해주세요.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        if (!summary.trim()) {
            openModal({
                title: '풀이 요약을 입력해주세요.',
                onCancelClick: () => {
                    closeModal();
                },
            });
            return;
        }

        if (!problemId) {
            openModal({
                title: '알고리즘 문제를 불러오지 못했습니다.',
                onCancelClick: () => {
                    navigate('/login');
                    closeModal();
                },
            });
            return;
        }

        if (!userId || !generationId) {
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
            const { content } = await onSubmit();

            const data = await createAlgorithmSolutionAPI({
                problemId: problemId,
                data: {
                    title: title.trim(),
                    summary,
                    ...solutionDetail,
                    content,
                },
            });

            navigate(
                `/study/algorithm/problem/${problemId}/solution/${data.id}`,
            );
        } catch (error) {
            if (error) {
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

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    const handleSolutionDetailChange = (
        field: keyof SolutionDetail,
        value: string,
    ) => {
        setSolutionDetail((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNumberInput = (
        field: 'runtime' | 'memory',
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setSolutionDetail((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const mode = 'create' as const;
    const props = {
        mode,
        pathname,
        editorRef,
        handleTitleChange,
        handleSummaryChange,
        handleSolutionDetailChange,
        handleNumberInput,
        handleCancel,
        handleSubmit,
        title,
        summary,
        solutionDetail,
    };

    return <AlgorithmSolutionForm {...props} />;
};

export default AlgorithmSolutionCreate;
