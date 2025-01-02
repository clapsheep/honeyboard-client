import Icon from '../Icon/Icon';
import { useRef } from 'react';

interface ChatInputProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChatInput = ({ id, value, onChange, onClick }: ChatInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
    };

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
                onKeyDown={handleKeyDown}
                className="max-h-[235px] w-full resize-none overflow-y-auto rounded-2xl border border-gray-400 px-5 py-4 pr-14 shadow-md placeholder:text-gray-500"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
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
