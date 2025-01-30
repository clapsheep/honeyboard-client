import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { Button } from '../atoms';
import { InputForm } from '../molecules';
import { AlgoInfo } from '../molecules';
import { Header } from '../organisms';

interface AlgorithmSolutionFormProps {
    mode: 'create' | 'edit';
    title: string;
    summary: string;
    solutionDetail?: {
        runtime: string;
        memory: string;
        languageId: string;
    };
    pathname: string;
    editorRef: React.RefObject<HTMLDivElement>;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSummaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSolutionDetailChange: (
        field: 'runtime' | 'memory' | 'languageId',
        value: string,
    ) => void;
    handleNumberInput: (
        field: 'runtime' | 'memory',
        e: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    handleCancel: () => void;
    handleSubmit: () => void;
}

const AlgorithmSolutionForm = ({
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
    solutionDetail = {
        runtime: '',
        memory: '',
        languageId: '1',
    },
}: AlgorithmSolutionFormProps) => {
    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '게시글 작성' : '게시글 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-start justify-between">
                    <AlgoInfo
                        memory={solutionDetail.memory}
                        runtime={solutionDetail.runtime}
                        languageId={solutionDetail.languageId}
                        onMemoryChange={(e) => handleNumberInput('memory', e)}
                        onRuntimeChange={(e) => handleNumberInput('runtime', e)}
                        onLanguageClick={(langId) =>
                            handleSolutionDetailChange('languageId', langId)
                        }
                    />
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleSubmit}>
                            {mode === 'create' ? '풀이 작성' : '풀이 수정'}
                        </Button>
                    </div>
                </div>
            </Header>

            <div className="flex flex-1 flex-col gap-4 p-6">
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
                <ToastEditorComponent
                    editorId="algorithmSolutionEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default AlgorithmSolutionForm;
