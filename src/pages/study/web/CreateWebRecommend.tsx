import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { createWebRecommendAPI } from '@/services/study/web';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const CreateWebRecommend = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webRecommendEditor',
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
            const { content } = await onSubmit();
            const currentDate = new Date().toISOString();

            await createWebRecommendAPI({
                id: '',
                title: title.trim(),
                url,
                content,
                userId,
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

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    return (
        <>
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
            <div className="flex flex-1 flex-col gap-4 p-4">
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
                    label="주소"
                    placeholder="사이트 주소를 입력하세요"
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />

                <ToastEditorComponent
                    editorId="webRecommendEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default CreateWebRecommend;
