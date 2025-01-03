import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import {
    getTrackProjectBoardAPI,
    updateTrackProjectBoardAPI,
} from '@/services/project/track';
import { useUserStore } from '@/stores/userStore';
import { TrackProjectBoardDetail } from '@/types/project/track';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const UpdateTrackProjectBoard = () => {
    const { trackId, projectId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [detail, setDetail] = useState<TrackProjectBoardDetail | null>(null);

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'trackProjectBoardEditor',
        initialContent: '',
    });

    useEffect(() => {
        if (!trackId || !projectId) {
            alert('글을 불러오지 못했습니다.');
            return;
        }

        const fetchContent = async () => {
            const data = await getTrackProjectBoardAPI(projectId, trackId);
            setDetail(data);
            setTitle(data.title);
            setUrl(data.url);
        };

        fetchContent();
    }, [trackId, projectId]);

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleUpdate = async () => {
        if (!detail) {
            alert('글을 불러오지 못했습니다.');
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

            await updateTrackProjectBoardAPI(detail.projectId, detail.trackId, {
                teamId: detail.teamId,
                trackId: detail.trackId,
                projectId: detail.projectId,
                title: title.trim(),
                url,
                content,
                thumbnail,
                createdAt: detail.createdAt,
                updatedAt: currentDate,
                isDeleted: false,
            });

            navigate(-1);
        } catch (error) {
            console.error('게시글 수정을 실패했습니다:', error);
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
                titleProps={{ title: '일지 수정' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleUpdate}>일지 수정</Button>
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
export default UpdateTrackProjectBoard;
