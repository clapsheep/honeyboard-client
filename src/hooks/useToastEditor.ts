import { useEffect, useRef } from 'react';
import Editor, { EditorOptions } from '@toast-ui/editor';
import type { HookCallback } from '@toast-ui/editor/types/editor';
import { uploadImageAPI } from '@/services/image/imageAPI';

interface UseToastEditorProps {
    editorId: string;
    content: string;
    onImageUpload?: (imageUrl: string) => void;
}

export const useToastEditor = ({
    editorId,
    content,
    onImageUpload,
}: UseToastEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<Editor | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const editorOptions: EditorOptions = {
            el: editorRef.current,
            previewStyle: 'vertical',
            initialEditType: 'markdown',
            initialValue: content,
            hooks: {
                addImageBlobHook: async (
                    blob: File | Blob,
                    callback: HookCallback,
                ) => {
                    try {
                        const timestamp = Date.now();
                        const imageFile =
                            blob instanceof File
                                ? blob
                                : new File(
                                      [blob],
                                      `${editorId}-image-${timestamp}.png`,
                                  );
                        const response = await uploadImageAPI(imageFile);
                        const imageUrl = response.data.imageUrl;

                        if (onImageUpload) {
                            onImageUpload(imageUrl);
                        }

                        callback(imageUrl, 'image');
                    } catch (error) {
                        console.error('이미지 업로드를 실패했습니다:', error);
                        callback('', 'error');
                    }
                },
            },
        };

        editorInstanceRef.current = new Editor(editorOptions);

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, [editorId, content, onImageUpload]);

    const getMarkdown = () => {
        return editorInstanceRef.current?.getMarkdown() || '';
    };

    const getHTML = () => {
        return editorInstanceRef.current?.getHTML() || '';
    };

    return {
        editorRef,
        getMarkdown,
        getHTML,
    };
};

export default useToastEditor;
