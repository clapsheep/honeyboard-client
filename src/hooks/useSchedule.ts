import { useState, useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';

type CalendarInstance = InstanceType<typeof Calendar>;

export const useSchedule = () => {
    const calendarRef = useRef<CalendarInstance>(null);
    const [date, setDate] = useState<Date>(new Date());

    // 현재 표시된 년,월
    useEffect(() => {
        calendarRef.current?.getInstance()?.setDate(date);
    }, []);

    const decreaseDate = () => {
        setDate((prev) => {
            const prevMonth = prev.getMonth();
            const prevYear = prev.getFullYear();

            const newDate =
                prevMonth === 0
                    ? new Date(prevYear - 1, 11)
                    : new Date(prevYear, prevMonth - 1);

            calendarRef.current?.getInstance()?.setDate(newDate);
            return newDate;
        });
    };

    const increaseDate = () => {
        setDate((prev) => {
            const prevMonth = prev.getMonth();
            const prevYear = prev.getFullYear();

            const newDate =
                prevMonth === 11
                    ? new Date(prevYear + 1, 0)
                    : new Date(prevYear, prevMonth + 1);

            calendarRef.current?.getInstance()?.setDate(newDate);
            return newDate;
        });
    };

    return {
        calendarRef,
        year: date.getFullYear(), // date에서 직접 계산
        month: date.getMonth() + 1, // date에서 직접 계산
        decreaseDate,
        increaseDate,
        calendars: [
            {
                id: 'NORMAL',
                name: 'NORMAL',
                color: '#039855',
                backgroundColor: '#ECFDF3',
                borderColor: '#039855',
            },
            {
                id: 'TRACK',
                name: 'TRACK',
                color: '#F04438',
                backgroundColor: '#FEE4E2',
                borderColor: '#F04438',
            },
            {
                id: 'PROJECT',
                name: 'PROJECT',
                color: '#175CD3',
                backgroundColor: '#D1E9FF',
                borderColor: '#175CD3',
            },
        ],
    };
};
