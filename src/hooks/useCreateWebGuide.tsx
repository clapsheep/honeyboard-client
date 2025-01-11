import { createWebGuideAPI } from '@/api/WebGuideAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import useToastEditor from './useToastEditor';

const useCreateUpdateWebGuide = ({ mode }: { mode: 'create' | 'edit' }) => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const [title, setTitle] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

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

            await createWebGuideAPI({
                data: {
                    title: title.trim(),
                    content,
                    thumbnail,
                },
            });

            navigate(-1);
        } catch (error) {
            console.error('게시글 작성을 실패했습니다:', error);
        }
    };
    return {
        handleCancel,
        handleCreate,
        handleTitleChange,
        editorRef,
        title,
    };
};
export default useCreateUpdateWebGuide;
