interface ToastEditorComponentProps {
    editorId: string;
    editorRef: React.RefObject<HTMLDivElement>;
}

const ToastEditorComponent = ({
    editorId,
    editorRef,
}: ToastEditorComponentProps) => {
    return <div id={editorId} ref={editorRef}></div>;
};

export default ToastEditorComponent;
