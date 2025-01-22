interface ToastEditorComponentProps {
    editorId: string;
    editorRef: React.RefObject<HTMLDivElement>;
}

const ToastEditorComponent = ({
    editorId,
    editorRef,
}: ToastEditorComponentProps) => {
    return (
        <section className="my-6 flex-1 bg-gray-25 px-6 py-4">
            <div className="min-h-full" id={editorId} ref={editorRef} />
        </section>
    );
};

export default ToastEditorComponent;
