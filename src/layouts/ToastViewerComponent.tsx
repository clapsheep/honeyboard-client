import useToastViewer from '@/hooks/useToastViewer';

interface ToastViewerComponentProps {
    content: string;
    viewerId: string;
}

const ToastViewerComponent = ({
    content,
    viewerId,
}: ToastViewerComponentProps) => {
    const { viewerRef } = useToastViewer({
        content,
        viewerId,
    });

    return <div id={viewerId} ref={viewerRef} />;
};

export default ToastViewerComponent;
