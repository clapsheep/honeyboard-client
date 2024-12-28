import { ChatInput } from '@/components/atoms';
import { useChat } from '@/hooks/useChat';
import { useUserStore } from '@/stores/userStore';
import { Message } from '@/types/chat';
import { useState } from 'react';

const PlayList = () => {
    const { userInfo } = useUserStore();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;

    const { messages, isLoading, sendMessage } = useChat(generationId!);

    const [text, setText] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    if (isLoading)
        return <div className="flex h-full w-1/2 flex-col">Loading...</div>;
    return (
        <div className="flex h-full w-1/2 flex-col">
            {messages.length === 0 ? (
                <div> 메세지가 없습니다.</div>
            ) : (
                <ul className="flex h-full w-full flex-col-reverse border">
                    {messages.map((message: Message) => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>
            )}
            <ChatInput
                id="chat"
                value={text}
                onChange={handleInputChange}
                onClick={() => sendMessage(text, userId!)}
            />
        </div>
    );
};

export default PlayList;
