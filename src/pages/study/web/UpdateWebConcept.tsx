import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import {
    getWebConceptDetailAPI,
    updateWebConceptAPI,
    WebConceptDetail,
} from '@/services/study/web';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const UpdateWebConcept = () => {
    const { conceptId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState<WebConceptDetail | null>(null);

    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    useEffect(() => {
        if (!conceptId) {
            alert('존재하지 않는 글입니다.');
            return;
        }

        const fetchContent = async () => {
            const data = await getWebConceptDetailAPI(conceptId);
            setDetail(data);
            setTitle(data.title);
        };

        fetchContent();
    }, [conceptId]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'webConceptEditor',
        initialContent: detail?.content || '',
    });

    const handleCancel = async () => {
        const confirm = await onCancel();
        if (confirm) {
            navigate('-1');
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
            const { content, thumbnail } = await onSubmit();
            const currentDate = new Date().toISOString();

            await updateWebConceptAPI({
                id: detail.id,
                title: title.trim(),
                content,
                userId,
                thumbnail,
                generationId,
                createdAt: detail.createdAt,
                updatedAt: currentDate,
                deleted: false,
            });

            navigate('/web/concept');
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
                titleProps={{ title: '글수정' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleUpdate}>글수정</Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-4">
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

export default UpdateWebConcept;
