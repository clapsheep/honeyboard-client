import { Button, CalendarTag } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { createAlgorithmSolutionAPI } from '@/services/study/algorithm';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

interface SolutionDetail {
    runtime: string;
    memory: string;
    languageId: string;
}

const CreateAlgorithmProblemSolution = () => {
    const { problemId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [solutionDetail, setSolutionDetail] = useState<SolutionDetail>({
        runtime: '',
        memory: '',
        languageId: '1',
    });

    const LANGUAGE_OPTIONS = [
        { id: '1', name: 'Java' },
        { id: '2', name: 'Python' },
        { id: '3', name: 'C++' },
    ];

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'AlgorithmSolutionEditor',
        initialContent: '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleCreate = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!userId || !generationId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        if (!problemId) {
            alert('알고리즘 문제를 불러오지 못했습니다.');
            return;
        }

        try {
            const { content } = await onSubmit();
            const currentDate = new Date().toISOString();

            await createAlgorithmSolutionAPI(problemId, {
                solutionId: '',
                problemId,
                title: title.trim(),
                summary,
                ...solutionDetail,
                content,
                Author: userInfo.name,
                userId,
                generationId,
                createdAt: currentDate,
                updatedAt: currentDate,
                isDeleted: false,
                isBookmarked: false,
            });

            navigate(-1);
        } catch (error) {
            console.error('풀이 작성을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    const handleDetailChange = (field: keyof SolutionDetail, value: string) => {
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

    return (
        <div>
            <Header
                titleProps={{ title: '풀이 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-start justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-700 text-text-md">
                                Memory
                            </span>
                            <input
                                id="memory"
                                placeholder="0"
                                type="text"
                                value={solutionDetail.memory}
                                onChange={(e) => handleNumberInput('memory', e)}
                                className="w-24 px-2 py-1 border border-gray-300 rounded-sm shadow-sm"
                            />
                            <span className="font-medium text-gray-700 text-text-md">
                                kb
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-700 text-text-md">
                                Time
                            </span>
                            <input
                                id="runtime"
                                placeholder="0"
                                type="text"
                                value={solutionDetail.runtime}
                                onChange={(e) =>
                                    handleNumberInput('runtime', e)
                                }
                                className="w-24 px-2 py-1 border border-gray-300 rounded-sm shadow-sm"
                            />
                            <span className="font-medium text-gray-700 text-text-md">
                                ms
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-700 text-text-md">
                                Language
                            </span>
                            <div className="flex gap-3">
                                {LANGUAGE_OPTIONS.map((lang) => (
                                    <CalendarTag
                                        key={lang.id}
                                        onClick={() =>
                                            handleDetailChange(
                                                'languageId',
                                                lang.id,
                                            )
                                        }
                                        color={
                                            solutionDetail.languageId ===
                                            lang.id
                                                ? 'blue'
                                                : 'regular'
                                        }
                                    >
                                        {lang.name}
                                    </CalendarTag>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>풀이 작성</Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-col flex-1 gap-4 p-6">
                <InputForm
                    id="AlgorithmSolutionTitle"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
                <InputForm
                    id="AlgorithmSolutionSummary"
                    label="풀이 요약"
                    placeholder="풀이를 요약해서 입력하세요"
                    required={true}
                    type="text"
                    value={summary}
                    onChange={handleSummaryChange}
                />
                <div className="flex-1">
                    <ToastEditorComponent
                        editorId="AlgorithmSolutionEditor"
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAlgorithmProblemSolution;
