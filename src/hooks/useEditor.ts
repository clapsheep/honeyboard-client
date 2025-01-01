import { useState, useEffect } from 'react';
import { deleteImageAPI } from '@/services/image/imageAPI';
import useToastEditor from './useToastEditor';

interface useEditorProps {
    editorId: string;
    initialContent: string;
}

interface EditorSubmitData {
    content: string;
    thumbnailUrl: string | null;
}

export const useEditor = ({ editorId, initialContent }: useEditorProps) => {
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { editorRef, getMarkdown, getHTML } = useToastEditor({
        editorId,
        content: initialContent,
        onImageUpload: (url: string) => {
            setUploadedImageUrls((prev) =>
                prev.includes(url) ? prev : [...prev, url],
            );
        },
    });

    // 글이 등록되지 않았을 경우 업로드된 이미지들 정리
    useEffect(() => {
        return () => {
            if (!isSubmitted) {
                const cleanup = async () => {
                    try {
                        await Promise.all(
                            uploadedImageUrls.map((url) => deleteImageAPI(url)),
                        );
                    } catch (error) {
                        console.error('이미지 정리 중 오류 발생:', error);
                    }
                };
                cleanup();
            }
        };
    }, [isSubmitted, uploadedImageUrls]);

    // 글 등록 시점에서 불필요한 이미지 삭제 및 썸네일 선정
    const handleSubmit = async (): Promise<EditorSubmitData> => {
        const markdown = getMarkdown();

        try {
            // 본문에 포함되지 않은 이미지url 삭제
            const unusedImages = uploadedImageUrls.filter(
                (url) => !markdown.includes(url),
            );

            if (unusedImages.length > 0) {
                await Promise.all(
                    unusedImages.map((url) => deleteImageAPI(url)),
                );
                setUploadedImageUrls((prev) =>
                    prev.filter((url) => markdown.includes(url)),
                );
            }

            // 썸네일 선정
            const firstImage = markdown.match(/!\[.*?\]\((.*?)\)/)?.[1] || null;

            setIsSubmitted(true);

            return {
                content: markdown,
                thumbnailUrl: firstImage,
            };
        } catch (error) {
            console.error('글 등록에 실패했습니다:', error);
            throw error;
        }
    };

    return {
        editorRef,
        getMarkdown,
        getHTML,
        handleSubmit,
    };
};
