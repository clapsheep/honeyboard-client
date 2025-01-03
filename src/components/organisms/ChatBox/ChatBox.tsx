import React, { useRef, useEffect } from 'react';
import { Chat, ChatInput } from '@/components/atoms';

export interface Chat {
    id: number;
    name: string;
    isMe: boolean;
    time: string;
    content: string;
}

interface ChatBoxProps {
    chatList: Chat[];
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSendClick: () => void;
}

const parseTime = (time: string): string => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;
    const formattedHours = isAM ? hours || 12 : hours - 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${isAM ? '오전' : '오후'} ${formattedHours}:${formattedMinutes}`;
};

const shouldShowDate = (
    currentTime: string,
    nextTime: string | null,
    isTopMessage: boolean,
): boolean => {
    if (isTopMessage) return true;
    if (!nextTime) return false;
    const currentDate = new Date(currentTime).toDateString();
    const nextDate = new Date(nextTime).toDateString();
    return currentDate !== nextDate;
};

const ChatBox = ({
    chatList,
    inputValue,
    onInputChange,
    onSendClick,
}: ChatBoxProps) => {
    const chatListRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chatList]);

    return (
        <>
            <div className="gap-4rounded-xl flex h-full w-full flex-col border-[2px] border-gray-300 bg-gray-25 px-4 pb-3 pt-4 shadow-md">
                <div
                    ref={chatListRef}
                    className="custom-scroll flex w-full flex-1 flex-col-reverse gap-5 overflow-y-auto p-3"
                >
                    {chatList.map((chat, index) => {
                        const isTopMessage = index === chatList.length - 1;
                        const nextChat = chatList[index - 1];
                        const showDate = shouldShowDate(
                            chat.time,
                            nextChat?.time ?? null,
                            isTopMessage,
                        );

                        return (
                            <>
                                {/* 채팅 먼저, 그다음 날짜 div */}
                                <Chat
                                    isMe={chat.isMe}
                                    name={chat.name}
                                    time={parseTime(chat.time)}
                                >
                                    {chat.content}
                                </Chat>
                                {showDate && (
                                    <div className="my-2 text-center text-text-md font-semibold text-gray-700">
                                        {new Date(chat.time)
                                            .toISOString()
                                            .slice(0, 10)}
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>

                <div>
                    <ChatInput
                        id="chat-input"
                        value={inputValue}
                        textareaRef={textareaRef} // 추가
                        onChange={onInputChange}
                        onClick={onSendClick}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                onSendClick();
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ChatBox;
