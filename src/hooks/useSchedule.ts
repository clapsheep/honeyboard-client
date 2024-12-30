import { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';

interface ScheduleInstance {
    setDate(date: Date): void;
    getDate(): Date;
    today(): Date;
    getInstance(): Calendar;
}

interface ScheduleRef {
    current: {
        getInstance(): ScheduleInstance;
    };
}

interface ScheduleDate {
    year: number;
    month: number;
}

export const useSchedule = () => {
    const scheduleRef = useRef<ScheduleRef['current']>(null);

    const [date, setDate] = useState<ScheduleDate>(() => {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
        };
    });

    useEffect(() => {
        if (scheduleRef.current) {
            scheduleRef.current
                .getInstance()
                .setDate(new Date(date.year, date.month - 1));
        }
    }, [date.year, date.month]);

    const decreaseDate = () => {
        setDate((prev) => ({
            ...prev,
            month: prev.month === 1 ? 12 : prev.month - 1,
            year: prev.month === 1 ? prev.year - 1 : prev.year,
        }));
    };

    const increaseDate = () => {
        setDate((prev) => ({
            ...prev,
            month: prev.month === 12 ? 1 : prev.month + 1,
            year: prev.month === 12 ? prev.year + 1 : prev.year,
        }));
    };

    return {
        scheduleRef,
        date,
        decreaseDate,
        increaseDate,
    };
};
