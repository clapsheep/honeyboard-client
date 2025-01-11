import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { Button } from '../atoms';
import { InputForm } from '../molecules';
import { Header } from '../organisms';

interface WebGuideFormProps {
    mode: 'create' | 'edit';
    title: string;
    pathname: string;
    editorRef: React.RefObject<HTMLDivElement>;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;
    handleSubmit: () => void;
}

const WebGuideForm = ({
    mode,
    title,
    pathname,
    editorRef,
    handleTitleChange,
    handleCancel,
    handleSubmit,
}: WebGuideFormProps) => {
    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '게시글 작성' : '게시글 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleSubmit}>
                            {mode === 'create' ? '게시글 작성' : '게시글 수정'}
                        </Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-6">
                <InputForm
                    id="webConceptTitle"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />

                <ToastEditorComponent
                    editorId="webConceptEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default WebGuideForm;
