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
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
const customScrollStyle = `
  /* 스크롤바 전체 */
  .custom-scroll::-webkit-scrollbar {
    width: 8px; /* 스크롤 너비 */
  }

  /* 스크롤 트랙 */
  .custom-scroll::-webkit-scrollbar-track {
    background: #f1f1f1; /* 트랙 배경색 */
    border-radius: 8px; /* 둥근 모서리 */
  }

  /* 스크롤바 손잡이 */
  .custom-scroll::-webkit-scrollbar-thumb {
    background: #888; /* 손잡이 색상 */
    border-radius: 8px; /* 둥근 모서리 */
    border: 2px solid #f1f1f1; /* 트랙과의 간격 */
  }

  /* 호버 시 손잡이 스타일 */
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 색상 변경 */
  }
`;
const ChatBox = ({
    chatList,
    inputValue,
    onInputChange,
    onSendClick,
}: ChatBoxProps) => {
    const chatListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chatList]);

    return (
        <>
            <style>{customScrollStyle}</style>
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
                            <React.Fragment key={chat.id}>
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
                            </React.Fragment>
                        );
                    })}
                </div>

                <div>
                    <ChatInput
                        id="chat-input"
                        value={inputValue}
                        onChange={onInputChange}
                        onClick={onSendClick}
                    />
                </div>
            </div>
        </>
    );
};

export default ChatBox;
