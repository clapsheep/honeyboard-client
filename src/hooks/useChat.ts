import { getChatMessagesAPI } from '@/api/chatAPI';
import { PageResponse } from '@/types/common';
import { Message } from '@/types/Message';
import { Client } from '@stomp/stompjs';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

const { VITE_BASE_URI } = import.meta.env;

export const useChat = (generationId: string) => {
    const clientRef = useRef<Client | null>(null);
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isLoading, error } =
        useInfiniteQuery({
            queryKey: ['chat', generationId],
            queryFn: ({ pageParam = 1 }) => {
                return getChatMessagesAPI({
                    currentPage: pageParam,
                    pageSize: 50,
                });
            },
            getNextPageParam: (lastPage) => {
                const { pageInfo } = lastPage;
                const nextPage =
                    pageInfo.currentPage < pageInfo.totalPages
                        ? pageInfo.currentPage + 1
                        : undefined;
                return nextPage;
            },
            initialPageParam: 1,
        });

    const messages = data?.pages.flatMap((page) => page.content) ?? [];

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${VITE_BASE_URI}/ws`),
            onConnect: () => {
                client.subscribe(
                    `/topic/generation/${generationId}`,
                    (message) => {
                        const chatMessage: Message = JSON.parse(message.body);
                        queryClient.setQueryData(
                            ['chat', generationId],
                            (oldData: { pages: PageResponse<Message>[] }) => {
                                if (!oldData) return oldData;
                                return {
                                    ...oldData,
                                    pages: oldData.pages.map(
                                        (
                                            page: PageResponse<Message>,
                                            index: number,
                                        ) => {
                                            if (index === 0) {
                                                return {
                                                    ...page,
                                                    content: [
                                                        chatMessage,
                                                        ...page.content,
                                                    ],
                                                };
                                            }
                                            return page;
                                        },
                                    ),
                                };
                            },
                        );
                    },
                );
                client.subscribe('/user/queue/errors', (message) => {
                    console.error('채팅 에러:', message.body);
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
            clientRef.current = null;
        };
    }, [generationId, queryClient]);

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

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        fetchNextPage,
        hasNextPage,
    };
};
