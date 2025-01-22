import {
    addScheduleEventsAPI,
    deleteScheduleEventsAPI,
    getScheduleEventsAPI,
    updateScheduleEventsAPI,
} from '@/api/scheduleAPI';

import { EventObject } from '@toast-ui/calendar/types/types/events';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { ScheduleEvent } from '@/types/Schedule';
import { useModalStore } from '@/stores/modalStore';

interface UseScheduleEventsReturn {
    events: ScheduleEvent[];
    error: string | null;
    fetchEvents: (year: number, month: number) => Promise<void>;
    onBeforeCreateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeUpdateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeDeleteEvent: (event: EventObject) => Promise<boolean>;
}

export const useScheduleEvents = (): UseScheduleEventsReturn => {
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const generationId = userInfo?.generationId;
    const userRole = userInfo?.role;

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
                id: event.scheduleId,
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
            console.error('일정 조회 실패:', error);
            setError('일정 조회를 실패했습니다.');
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
            if (userRole !== 'ADMIN') {
                openModal({
                    title: '일정 등록 권한이 없습니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
                return false;
            }

            const newEvent: ScheduleEvent = {
                content: eventData.title,
                startDate: new Date(eventData.start),
                endDate: new Date(eventData.end),
                scheduleType: eventData.calendarId,
                publicAccess: !eventData.isPrivate,
                userId: userId!,
                generationId: generationId!,
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
            setError('일정 등록을 실패했습니다.');
            return false;
        }
    };

    // 일정 수정
    const onBeforeUpdateEvent = async (eventData: EventObject) => {
        try {
            if (userRole !== 'ADMIN') {
                openModal({
                    title: '일정 수정 권한이 없습니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
                return false;
            }

            // 변경사항 유무에 따라 변경 값 혹은 기존 값 사용
            const changes = eventData.changes;
            const event = eventData.event;

            const updatedEvent: ScheduleEvent = {
                scheduleId: event.id,
                content: changes?.title || event.title,
                startDate: new Date(changes?.start || event.start),
                endDate: new Date(changes?.end || event.end),
                scheduleType: changes?.calendarId || event.calendarId,
                publicAccess: !(changes?.isPrivate ?? event.isPrivate),
                userId: userId!,
                generationId: generationId!,
            };

            await updateScheduleEventsAPI(updatedEvent);

            const currentDate = new Date();
            await fetchEvents(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
            );

            return true;
        } catch (error) {
            console.error('일정 수정 에러:', error);
            setError('일정 수정을 실패했습니다.');
            return false;
        }
    };

    // 일정 삭제
    const onBeforeDeleteEvent = async (eventData: EventObject) => {
        try {
            if (userRole !== 'ADMIN') {
                openModal({
                    title: '일정 삭제 권한이 없습니다.',
                    onCancelClick: () => {
                        closeModal();
                    },
                });
                return false;
            }

            await deleteScheduleEventsAPI(eventData.id as string);

            const currentDate = new Date();
            await fetchEvents(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
            );

            return true;
        } catch (error) {
            console.error(error);
            setError('일정 삭제를 실패했습니다.');
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
