import Icon from '../Icon/Icon';

interface ChatInputProps {
    id: string;
    value: string;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChatInput = ({
    id,
    value,
    textareaRef,
    onChange,
    onClick,
}: ChatInputProps) => {
    return (
        <div className="relative flex items-center">
            <textarea
                id={id}
                name={id}
                value={value}
                placeholder="채팅을 입력하세요"
                ref={textareaRef}
                rows={1}
                onChange={onChange}
                className="w-full resize-none overflow-hidden rounded-2xl border border-gray-400 px-5 py-4 pr-14 shadow-md placeholder:text-gray-500"
            />
            <button
                type="button"
                onClick={onClick}
                className="absolute bottom-4 right-5"
            >
                <Icon id="send" size={24}></Icon>
            </button>
        </div>
    );
};

export default ChatInput;
