import {
    addScheduleEventsAPI,
    deleteScheduleEventsAPI,
    getScheduleEventsAPI,
    updateScheduleEventsAPI,
} from '@/api/scheduleAPI';

import { EventObject } from '@toast-ui/calendar/types/types/events';
import { useEffect, useState } from 'react';
import { ScheduleEvent } from '@/types/Schedule';
import { useModalStore } from '@/stores/modalStore';
import { AxiosError } from 'axios';

interface UseScheduleEventsReturn {
    events: ScheduleEvent[];
    error: string | null;
    fetchEvents: (year: number, month: number) => Promise<void>;
    onBeforeCreateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeUpdateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeDeleteEvent: (event: EventObject) => Promise<boolean>;
}

export const useScheduleEvents = (): UseScheduleEventsReturn => {
    const { openModal, closeModal } = useModalStore();

    const [events, setEvents] = useState<EventObject[]>([]);
    const [error, setError] = useState<string | null>(null);

    // 일정 조회
    const fetchEvents = async (year: number, month: number) => {
        try {
            const { data } = await getScheduleEventsAPI(year, month);

            // 일정목록이 비었는지 확인
            const events = Array.isArray(data) ? data : [];

            const formattedEvents = events.map((event) => ({
                id: event.id,
                calendarId: event.scheduleType,
                title: event.content,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
                category: 'allday',
                isAllday: true,
                isPrivate: !event.publicAccess,
                isVisible: true,
                attendees: '',
                state: '',
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정 조회 에러:', error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '일정을 찾을 수 없습니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
                setError(errorMessage);
            }
        }
    };

    // 현재 월의 일정 자동 조회
    useEffect(() => {
        const now = new Date();
        fetchEvents(now.getFullYear(), now.getMonth() + 1);
    }, []);

    // 일정 등록
    const onBeforeCreateEvent = async (eventData: EventObject) => {
        try {
            const newEvent: ScheduleEvent = {
                content: eventData.title,
                startDate: eventData.start.d.d.toISOString(),
                endDate: eventData.end.d.d.toISOString(),
                scheduleType: eventData.calendarId,
                publicAccess: !eventData.isPrivate,
            };

            if (newEvent.scheduleType === 'TRACK') {
                openModal({
                    title: '관통 프로젝트 일정은 자동 등록됩니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
                return false;
            }

            await addScheduleEventsAPI(newEvent);

            const currentDate = new Date();
            await fetchEvents(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
            );

            return true;
        } catch (error) {
            console.error('일정 등록 에러:', error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '일정 추가에 실패하였습니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
                setError(errorMessage);
            }

            return false;
        }
    };

    // 일정 수정
    const onBeforeUpdateEvent = async (eventData: EventObject) => {
        try {
            // 변경사항 유무에 따라 변경 값 혹은 기존 값 사용
            const changes = eventData.changes;
            const event = eventData.event;

            const updatedEvent: ScheduleEvent = {
                id: event.id,
                content: changes?.title || event.title,
                startDate: changes?.start
                    ? changes.start.d.d.toISOString()
                    : event.start.d.d.toISOString(),
                endDate: changes?.end
                    ? changes.end.d.d.toISOString()
                    : event.end.d.d.toISOString(),
                scheduleType: changes?.calendarId || event.calendarId,
                publicAccess: !(changes?.isPrivate ?? event.isPrivate),
            };

            if (
                event.calendarId !== 'TRACK' &&
                changes?.calendarId === 'TRACK'
            ) {
                openModal({
                    title: '관통 프로젝트 일정은 자동 등록됩니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
                return false;
            }

            await updateScheduleEventsAPI(updatedEvent);

            const currentDate = new Date();
            await fetchEvents(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
            );

            return true;
        } catch (error) {
            console.error('일정 수정 에러:', error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '일정 수정에 실패하였습니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
                setError(errorMessage);
            }

            return false;
        }
    };

    // 일정 삭제
    const onBeforeDeleteEvent = async (eventData: EventObject) => {
        try {
            await deleteScheduleEventsAPI(eventData.id as string);

            const currentDate = new Date();
            await fetchEvents(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
            );

            return true;
        } catch (error) {
            console.error('일정 삭제 에러:', error);

            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === '일정 삭제에 실패하였습니다.') {
                    openModal({
                        title: errorMessage,
                        onCancelClick: () => {
                            closeModal();
                        },
                    });
                }
                setError(errorMessage);
            }

            return false;
        }
    };

    return {
        events,
        error,
        fetchEvents,
        onBeforeCreateEvent,
        onBeforeUpdateEvent,
        onBeforeDeleteEvent,
    };
};
