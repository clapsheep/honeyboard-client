import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { Button } from '../atoms';
import { InputForm } from '../molecules';
import { Header } from '../organisms';

interface WebRecommendFormProps {
    mode: 'create' | 'edit';
    title: string;
    url: string;
    pathname: string;
    editorRef: React.RefObject<HTMLDivElement>;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;
    handleSubmit: () => void;
}

const WebRecommendForm = ({
    mode,
    title,
    url,
    pathname,
    editorRef,
    handleTitleChange,
    handleUrlChange,
    handleCancel,
    handleSubmit,
}: WebRecommendFormProps) => {
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
                    id="webRecommendTitle"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />

                <InputForm
                    id="webRecommendUrl"
                    label="URL"
                    placeholder="URL을 입력하세요"
                    required={true}
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />

                <ToastEditorComponent
                    editorId="webConceptEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default WebRecommendForm;
