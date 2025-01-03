import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useUserStore } from '@/stores/userStore';
import useToastEditor from '@/hooks/useToastEditor';
import { createWebConceptAPI } from '@/services/study/web';

const CreateWebConcept = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webConceptEditor',
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

        try {
            const { content, thumbnail } = await onSubmit();
            const currentDate = new Date().toISOString();

            await createWebConceptAPI({
                id: '',
                title: title.trim(),
                content,
                userId,
                thumbnail,
                generationId,
                createdAt: currentDate,
                updatedAt: currentDate,
                deleted: false,
            });

            navigate(-1);
        } catch (error) {
            console.error('게시글 작성을 실패했습니다:', error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div>
            <Header
                titleProps={{ title: '게시글 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>게시글 작성</Button>
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
                <div className="flex-1">
                    <ToastEditorComponent
                        editorId="webConceptEditor"
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateWebConcept;
