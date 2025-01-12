import { Chat, ChatInput } from '@/components/atoms';
import { useChat } from '@/hooks/useChat';
import { UserInfo } from '@/types/auth';
import { useState } from 'react';

const ChatSection = ({ userInfo }: { userInfo: UserInfo }) => {
    const { messages, sendMessage, fetchNextPage, hasNextPage } = useChat(
        userInfo.generationId,
    );

    const [chatMessage, setChatMessage] = useState('');
    const onSubmitChat = (message: string) => {
        sendMessage(message, userInfo.userId);
        setChatMessage('');
    };
    const onChangeChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatMessage(e.target.value);
    };

    // IntersectionObserver 구현해야함

    return (
        <div className="my-6 flex w-[464px] flex-col-reverse items-center rounded-xl border border-gray-300 bg-gray-25 p-4 shadow-md">
            <ChatInput
                id="chat"
                onClick={() => onSubmitChat(chatMessage)}
                onChange={onChangeChat}
                value={chatMessage}
            />
            <ul className="flex h-[786px] w-full flex-col-reverse gap-4 overflow-y-auto pb-2">
                {messages.map((message) => (
                    <Chat
                        key={message.id}
                        time={message.createdAt}
                        name={message.sender}
                        isMe={message.userId === userInfo.userId}
                    >
                        {message.content}
                    </Chat>
                ))}
            </ul>
        </div>
    );
};

export default ChatSection;
