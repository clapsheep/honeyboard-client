interface ModalButtonProps {
    type: 'button' | 'submit' | 'reset';
    action: 'delete' | 'confirm' | 'cancel';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const ModalButton = ({
    type,
    action,
    onClick,
    disabled = false,
}: ModalButtonProps) => {
    const content =
        action === 'delete' ? '삭제' : action === 'confirm' ? '확인' : '취소';

    const COLOR_PROS = {
        delete: 'bg-error-600 text-gray-25',
        confirm: 'bg-blue-700 text-gray-25',
        cancel: 'bg-gray-25 border border-gray-300 text-gray-700',
    };
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center gap-2 rounded-lg px-[18px] py-[10px] text-text-md font-semibold shadow-xs disabled:opacity-50 ${COLOR_PROS[action]}`}
        >
            {content}
        </button>
    );
};

export default ModalButton;
