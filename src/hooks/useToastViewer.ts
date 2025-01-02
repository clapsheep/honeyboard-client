import { useEffect, useRef } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
interface UseToastViewerProps {
    content?: string;
    viewerId: string;
}

const useToastViewer = ({ content }: UseToastViewerProps) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstanceRef = useRef<Viewer | null>(null);

    useEffect(() => {
        if (!viewerRef.current || !content) return;

        viewerInstanceRef.current = new Viewer({
            el: viewerRef.current,
            initialValue: content,
        });

        return () => {
            if (viewerInstanceRef.current) {
                viewerInstanceRef.current.destroy();
            }
        };
    }, [content]);

    return {
        viewerRef,
        viewerInstanceRef,
    };
};

export default useToastViewer;
