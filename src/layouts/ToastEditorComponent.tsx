import useToastEditor from '@/hooks/useToastEditor';

interface ToastEditorComponentProps {
    editorId: string;
    content: string;
}

const ToastEditorComponent = ({
    editorId,
    content,
}: ToastEditorComponentProps) => {
    const { editorRef } = useToastEditor({
        editorId,
        content,
    });

    return <div id={editorId} ref={editorRef}></div>;
};

export default ToastEditorComponent;
