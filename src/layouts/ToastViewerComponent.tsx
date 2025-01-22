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

    return (
        <section className="my-6 flex-1 bg-gray-25 px-6 py-4">
            <div className="min-h-full" id={viewerId} ref={viewerRef} />
        </section>
    );
};

export default ToastViewerComponent;
