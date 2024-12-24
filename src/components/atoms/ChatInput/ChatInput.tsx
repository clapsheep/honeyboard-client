import Icon from '../Icon/Icon';

interface ChatInputProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChatInput = ({ id, value, onChange, onClick }: ChatInputProps) => {
    return (
        <div className="relative flex items-center">
            <input
                id={id}
                name={id}
                value={value}
                placeholder="채팅을 입력하세요"
                onChange={onChange}
                className="w-full rounded-2xl border border-gray-400 px-5 py-4 pr-14 shadow-md placeholder:text-gray-500"
            />
            <button
                type="button"
                onClick={onClick}
                className="absolute right-5"
            >
                <Icon id="send" size={24}></Icon>
            </button>
        </div>
    );
};

export default ChatInput;
