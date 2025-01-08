import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import useToastEditor from '@/hooks/useToastEditor';
import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import {
    getAlgorithmConceptDetailAPI,
    updateAlgorithmConceptAPI,
} from '@/services/study/algorithm';
import { AlgorithmConceptDetail } from '@/types/study';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const UpdateAlgorithmConcept = () => {
    const { conceptId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState<AlgorithmConceptDetail | null>(null);

    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;
    const bookmark = false; // 추후 수정

    useEffect(() => {
        if (!conceptId) {
            alert('글을 불러오지 못했습니다.');
            return;
        }

        const fetchContent = async () => {
            const data = await getAlgorithmConceptDetailAPI(
                conceptId,
                bookmark,
            );
            setDetail(data);
            setTitle(data.title);
        };

        fetchContent();
    }, [conceptId, bookmark]);

    const { onSubmit, onCancel, editorRef } = useToastEditor({
        editorId: 'algorithmConceptEditor',
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
            const { content, thumbnail } = await onSubmit();
            const currentDate = new Date().toISOString();

            await updateAlgorithmConceptAPI(detail.id, {
                id: detail.id,
                title: title.trim(),
                content,
                userId,
                thumbnail,
                generationId,
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

    return (
        <>
            <Header
                titleProps={{ title: '게시글 수정' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleUpdate}>게시글 수정</Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-6">
                <InputForm
                    id="algorithmConceptTitle"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />

                <ToastEditorComponent
                    editorId="algorithmConceptEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default UpdateAlgorithmConcept;
