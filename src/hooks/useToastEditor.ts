import { useEffect, useRef, useState } from 'react';
import Editor, { EditorOptions } from '@toast-ui/editor';
import type { HookCallback } from '@toast-ui/editor/types/editor';

import {
    ImageOptimizationOptions,
    DEFAULT_OPTIMIZATION_OPTIONS,
    optimizeImageToWebP,
    ImageAnalysis,
} from '@/utils/imageOptimization';
import { useModalStore } from '@/stores/modalStore';
import { deleteImageAPI, uploadImageAPI } from '@/api/imageAPI';

interface UseEditorProps {
    editorId: string;
    initialContent: string;
    optimizationOptions?: ImageOptimizationOptions;
    onImageOptimized?: (analysis: ImageAnalysis) => void;
}

const useToastEditor = ({
    editorId,
    initialContent,
    optimizationOptions = DEFAULT_OPTIMIZATION_OPTIONS,
    onImageOptimized,
}: UseEditorProps) => {
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<Editor | null>(null);
    const { openModal, closeModal } = useModalStore();

    // 글 작성 중 뒤로가기 및 창 닫기 시 이미지 삭제
    useEffect(() => {
        // 창 닫기/새로고침
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSubmit && uploadedImageUrls.length > 0) {
                e.preventDefault();
                uploadedImageUrls.forEach((url) => deleteImageAPI(url));
            }
        };

        // 뒤로가기
        const handlePopState = () => {
            if (!isSubmit && uploadedImageUrls.length > 0) {
                uploadedImageUrls.forEach((url) => deleteImageAPI(url));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isSubmit, uploadedImageUrls]);

    // 취소 버튼 누를 시 업로드 된 된 이미지 삭제
    const cleanupImages = () => {
        if (!isSubmit && uploadedImageUrls.length > 0) {
            uploadedImageUrls.forEach((url) => deleteImageAPI(url));
            setUploadedImageUrls([]);
        }
    };

    const onCancel = () => {
        return new Promise<boolean>((resolve) => {
            openModal({
                icon: 'warning',
                title: '작성 취소',
                subTitle: '정말 취소하시겠습니까?',
                onConfirmClick: () => {
                    cleanupImages();
                    closeModal();
                    resolve(true);
                },
                onCancelClick: () => {
                    closeModal();
                    resolve(false);
                },
            });
        });
    };

    // 에디터 기능
    useEffect(() => {
        if (!editorRef.current) return;

        const editorOptions: EditorOptions = {
            el: editorRef.current,
            previewStyle: 'tab',
            initialEditType: 'markdown',
            hideModeSwitch: true,
            initialValue: initialContent,
            hooks: {
                addImageBlobHook: async (
                    blob: File | Blob,
                    callback: HookCallback,
                ) => {
                    try {
                        // 이미지 최적화 및 분석
                        const { optimizedBlob, analysis } =
                            await optimizeImageToWebP(
                                blob,
                                optimizationOptions,
                            );

                        // 콜백으로 분석 결과 전달
                        onImageOptimized?.(analysis);

                        const imageFile = new File(
                            [optimizedBlob],
                            `${editorId}-image-${Date.now()}.webp`,
                            { type: 'image/webp' },
                        );

                        const response = await uploadImageAPI(imageFile);
                        const imageUrl = response.data.url;

                        setUploadedImageUrls((prev) =>
                            prev.includes(imageUrl)
                                ? prev
                                : [...prev, imageUrl],
                        );

                        callback(imageUrl, 'image');
                    } catch (error) {
                        console.error('이미지 업로드 실패:', error);
                        callback('', 'error');
                    }
                },
            },
        };

        editorInstanceRef.current = new Editor(editorOptions);

        return () => {
            editorInstanceRef.current?.destroy();
        };
    }, [editorId, initialContent]);

    // 글 등록과 함께 이미지 삭제 처리 및 썸네일 선정
    const onSubmit = async () => {
        if (!editorInstanceRef.current) {
            throw new Error('에디터가 초기화되지 않았습니다.');
        }

        const content = editorInstanceRef.current.getMarkdown();
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            throw new Error('내용이 없습니다.');
        }

        // 업로드 됐지만 사용자가 삭제한 이미지를 서버에서도 삭제
        const unusedImages = uploadedImageUrls.filter(
            (url) => !content.includes(url),
        );

        if (unusedImages.length) {
            await Promise.all(
                unusedImages.map((url) => {
                    return deleteImageAPI(url);
                }),
            );
            setUploadedImageUrls((prev) =>
                prev.filter((url) => content.includes(url)),
            );
        }

        const thumbnail = content.match(/!\[.*?\]\((.*?)\)/)?.[1] || '';

        setIsSubmit(true);

        return { content, thumbnail };
    };

    return {
        editorRef,
        onSubmit,
        onCancel,
    };
};

export default useToastEditor;
