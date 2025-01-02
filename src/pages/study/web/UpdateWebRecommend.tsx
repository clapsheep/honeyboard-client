import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import {
    getWebRecommendDetailAPI,
    updateWebRecommendAPI,
    WebRecommendDetail,
} from '@/services/study/web';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const UpdateWebRecommend = () => {
    const { recommendId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [detail, setDetail] = useState<WebRecommendDetail | null>(null);

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    useEffect(() => {
        if (!recommendId) {
            alert('존재하지 않는 글입니다.');
            return;
        }

        const fetchContent = async () => {
            const data = await getWebRecommendDetailAPI(recommendId);
            setDetail(data);
            setTitle(data.title);
            setUrl(data.url);
        };

        fetchContent();
    }, [recommendId]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webRecommendEditor',
        initialContent: detail?.content || '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate(-1);
        }
    };

    const handleUpdate = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!userId || !generationId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        if (!detail) {
            alert('글을 불러오지 못했습니다.');
            return;
        }

        try {
            const { content } = await onSubmit();
            const currentDate = new Date().toISOString();

            await updateWebRecommendAPI({
                id: detail.id,
                title: title.trim(),
                content,
                userId,
                url,
                generationId,
                createdAt: detail.createdAt,
                updatedAt: currentDate,
                deleted: false,
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
        <div>
            <Header
                titleProps={{ title: '게시글 수정' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleUpdate}>게시글수정</Button>
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
                    label="주소"
                    placeholder="사이트 주소를 입력하세요"
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />
                <div className="flex-1">
                    <ToastEditorComponent
                        editorId="webRecommendEditor"
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateWebRecommend;
