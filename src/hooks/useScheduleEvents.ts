import {
    getScheduleEventsAPI,
    addScheduleEventsAPI,
    updateScheduleEventsAPI,
    deleteScheduleEventsAPI,
} from '@/services/schedule';
import { useEffect, useState } from 'react';
import { Event } from '@/types/schedule';
import { EventObject } from '@toast-ui/calendar/types/types/events';

interface UseScheduleEventsReturn {
    events: Event[];
    isLoading: boolean;
    error: string | null;
    onBeforeCreateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeUpdateEvent: (event: EventObject) => Promise<boolean>;
    onBeforeDeleteEvent: (event: EventObject) => Promise<boolean>;
}

export const useScheduleEvents = (): UseScheduleEventsReturn => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        try {
            const { data } = await getScheduleEventsAPI();
            setEvents(data);
        } catch (error) {
            console.error(error);
            setError('일정 조회를 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const onBeforeCreateEvent = async (eventData: EventObject) => {
        try {
            const newEvent: Event = {
                scheduleId: eventData.id as string,
                content: eventData.title,
                startDate: new Date(eventData.start),
                endDate: new Date(eventData.end),
                scheduleType: eventData.calendarId,
                publicAccess: eventData.isPrivate,
                userId: '',
                generationId: '',
            };

            const { data } = await addScheduleEventsAPI(newEvent);
            setEvents((prev) => [...prev, data]);
            return true;
        } catch (error) {
            console.error(error);
            setError('일정 등록을 실패했습니다.');
            return false;
        }
    };

    const onBeforeUpdateEvent = async (eventData: EventObject) => {
        try {
            const updatedEvent: Event = {
                scheduleId: eventData.id as string,
                content: eventData.title,
                startDate: new Date(eventData.start),
                endDate: new Date(eventData.end),
                scheduleType: eventData.calendarId,
                publicAccess: true,
                userId: '',
                generationId: '',
            };

            const { data } = await updateScheduleEventsAPI(updatedEvent);
            setEvents((prev) =>
                prev.map((event) =>
                    event.scheduleId === data.scheduleId ? data : event,
                ),
            );
            return true;
        } catch (error) {
            console.error(error);
            setError('일정 수정을 실패했습니다.');
            return false;
        }
    };

    const onBeforeDeleteEvent = async (eventData: EventObject) => {
        try {
            await deleteScheduleEventsAPI(eventData.id as string);
            setEvents((prev) =>
                prev.filter((event) => event.scheduleId !== eventData.id),
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
        isLoading,
        error,
        onBeforeCreateEvent,
        onBeforeUpdateEvent,
        onBeforeDeleteEvent,
    };
};
