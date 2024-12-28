import { getChatMessagesAPI } from '@/services/chat/chatAPI';
import { Message } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const { VITE_BASE_URI } = import.meta.env;
export const useChat = (generationId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getChatMessagesAPI();
                setMessages(data.content);
            } catch (error) {
                console.error(error);
                setError('채팅을 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        const client = new Client({
            webSocketFactory: () => new SockJS(`${VITE_BASE_URI}/ws`),
            // debug: (str) => console.log(str),
            onConnect: () => {
                // console.log('웹소켓 연결 성공');
                client.subscribe(
                    `/topic/generation/${generationId}`,
                    (message) => {
                        const chatMessage: Message = JSON.parse(message.body);
                        setMessages((prev) => [chatMessage, ...prev]);
                    },
                );
                client.subscribe('/user/queue/errors', (message) => {
                    console.error('채팅 에러:', message.body);
                });
            },
            onDisconnect: () => {
                // console.log('웹소켓 연결 종료');
            },
        });
        client.activate();
        clientRef.current = client;
        fetchMessages();
        return () => {
            client.deactivate();
            clientRef.current = null;
        };
    }, [generationId]);
    const sendMessage = (content: string, userId: string) => {
        if (!clientRef.current?.connected) {
            console.error('웹 소켓이 구성되지 않았습니다.');
            return;
        }
        clientRef.current?.publish({
            destination: `/app/chat.send`,
            body: JSON.stringify({ content, userId }),
        });
    };
    return { messages, isLoading, error, sendMessage };
};
