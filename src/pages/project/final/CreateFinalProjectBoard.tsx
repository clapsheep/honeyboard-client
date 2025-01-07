import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const CreateFinalProjectBoard = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'finalProjectBoardEditor',
        initialContent: '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleCreate = async () => {
        try {
            await onSubmit();

            navigate(-1);
        } catch (error) {
            console.error('게시글 작성을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    return (
        <>
            <Header
                titleProps={{ title: '일지 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>일지 작성</Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-6">
                <InputForm
                    id="finalProjectBoardTitle"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
                <InputForm
                    id="finalProjectBoardSummary"
                    label="요약"
                    placeholder="진행상황을 간단히 입력하세요."
                    required={true}
                    type="text"
                    value={summary}
                    onChange={handleSummaryChange}
                />
                <ToastEditorComponent
                    editorId="finalProjectBoardEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default CreateFinalProjectBoard;
