import { Chat, ChatInput } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { useEffect, useRef, useState } from 'react';

const ChatSection = () => {
    const { userInfo } = useAuth();
    const [chatMessage, setChatMessage] = useState('');
    const observerRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, fetchNextPage, hasNextPage } = useChat(
        userInfo!.generationId,
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage, hasNextPage]);

    const onSubmitChat = (message: string) => {
        sendMessage(message, userInfo!.userId);
        setChatMessage('');
    };
    const onChangeChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatMessage(e.target.value);
    };

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
                        time={new Date(message.createdAt)}
                        name={message.sender}
                        isMe={message.userId === userInfo!.userId}
                    >
                        {message.content}
                    </Chat>
                ))}
                <div ref={observerRef} className="h-10 w-full p-1">
                    {''}
                </div>
            </ul>
        </div>
    );
};

export default ChatSection;
