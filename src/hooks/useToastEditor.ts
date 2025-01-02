import { useEffect, useRef, useState } from 'react';
import Editor, { EditorOptions } from '@toast-ui/editor';
import type { HookCallback } from '@toast-ui/editor/types/editor';
import { deleteImageAPI, uploadImageAPI } from '@/services/image/imageAPI';

interface UseEditorProps {
    editorId: string;
    initialContent: string;
}

const useToastEditor = ({ editorId, initialContent }: UseEditorProps) => {
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<Editor | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const editorOptions: EditorOptions = {
            el: editorRef.current,
            previewStyle: 'vertical',
            initialEditType: 'markdown',
            hideModeSwitch: true,
            initialValue: initialContent,
            hooks: {
                addImageBlobHook: async (
                    blob: File | Blob,
                    callback: HookCallback,
                ) => {
                    try {
                        const imageFile =
                            blob instanceof File
                                ? blob
                                : new File(
                                      [blob],
                                      `${editorId}-image-${Date.now()}.png`,
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
            // 사용자가 글을 미등록했다면 업로드된 이미지 삭제
            if (!isSubmit) {
                const cleanup = async () => {
                    try {
                        await Promise.all(
                            uploadedImageUrls.map((url) => deleteImageAPI(url)),
                        );
                    } catch (error) {
                        console.error('이미지 정리 중 오류:', error);
                    }
                };
                cleanup();
            }

            editorInstanceRef.current?.destroy();
        };
    }, [editorId, initialContent, isSubmit]);

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
    };
};

export default useToastEditor;
