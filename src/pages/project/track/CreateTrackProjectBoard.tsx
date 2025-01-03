import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { createTrackProjectBoardAPI } from '@/services/project/track';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const CreateTrackProjectBoard = () => {
    const { trackId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'trackProjectBoardEditor',
        initialContent: '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleCreate = async () => {
        if (!trackId) {
            alert('프로젝트를 불러오지 못했습니다.');
            return;
        }

        if (!title.trim() || !url) {
            alert('제목과 url을 입력해주세요.');
            return;
        }

        if (!userId || !generationId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        try {
            const { content, thumbnail } = await onSubmit();
            const currentDate = new Date().toISOString();
            const teamId = '';

            await createTrackProjectBoardAPI(trackId, {
                teamId,
                trackId,
                projectId: '',
                title: title.trim(),
                url,
                content,
                thumbnail,
                createdAt: currentDate,
                updatedAt: currentDate,
                isDeleted: false,
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
            <div className="flex flex-col flex-1 gap-4 p-6">
                <InputForm
                    id="trackProjectBoardTitle"
                    label="프로젝트 제목"
                    placeholder="프로젝트 제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
                <InputForm
                    id="trackProjectBoardUrl"
                    label="Git 주소"
                    placeholder="Git 주소를 입력하세요"
                    required={true}
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />
                <ToastEditorComponent
                    editorId="trackProjectBoardEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default CreateTrackProjectBoard;
