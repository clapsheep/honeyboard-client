interface ModalButtonProps {
    action: 'delete' | 'confirm' | 'cancel';
    onClick: (e: React.MouseEvent) => void;
}

const ModalButton = ({ action, onClick }: ModalButtonProps) => {
    const content =
        action === 'delete' ? '삭제' : action === 'confirm' ? '확인' : '취소';

    const COLOR_PROS = {
        delete: 'bg-error-600 text-gray-25',
        confirm: 'bg-blue-700 text-gray-25',
        cancel: 'bg-gray-25 border border-gray-300 text-gray-700',
    };
    return (
        <button
            onClick={onClick}
            className={`flex justify-center gap-2 rounded-lg px-[18px] py-[10px] text-text-md font-semibold shadow-xs ${COLOR_PROS[action]}`}
        >
            {content}
        </button>
    );
};

export default ModalButton;
