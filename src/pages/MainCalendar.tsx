import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { EventObject } from '@toast-ui/calendar/types/types/events';
import { SelectCalender } from '@/components/atoms';
import { useEffect, useState, useRef } from 'react';
import Button from '@/components/atoms/Button/Button';

interface CalendarInstance {
    setDate(date: Date): void;
    getDate(): Date;
    today(): Date;
    getInstance(): Calendar;
}

interface CalendarRef {
    current: {
        getInstance(): CalendarInstance;
    };
}

const MainCalendar = () => {
    const calendarRef = useRef<CalendarRef['current']>(null);

    // SelectCalendar
    const [date, setDate] = useState(() => {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
        };
    });

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current
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

    const calendars = [
        {
            id: 'NORMAL',
            name: 'NORMAL',
            color: '#039855',
            backgroundColor: '#ECFDF3',
            borderColor: '#039855',
        },
        {
            id: 'PROJECT',
            name: 'PROJECT',
            color: '#F04438',
            backgroundColor: '#FEE4E2',
            borderColor: '#F04438',
        },
    ];
    const initialEvents: EventObject[] = [
        {
            id: '1',
            calendarId: 'NORMAL',
            title: '알고리즘',
            category: 'allday',
            start: new Date('2024-12-03'),
            end: new Date('2024-12-03'),
        },
        {
            id: '2',
            calendarId: 'PROJECT',
            title: 'Vue 관통',
            category: 'allday',
            isAllday: true,
            start: new Date('2024-12-13'),
            end: new Date('2024-12-13'),
        },
        {
            id: '3',
            calendarId: 'NORMAL',
            title: '알고리즘',
            category: 'allday',
            start: new Date('2024-12-17'),
            end: new Date('2024-12-17'),
        },
        {
            id: '4',
            calendarId: 'NORMAL',
            title: '알고리즘',
            category: 'allday',
            start: new Date('2024-12-24'),
            end: new Date('2024-12-24'),
        },
        {
            id: '5',
            calendarId: 'NORMAL',
            title: '알고리즘',
            category: 'allday',
            start: new Date('2024-12-24'),
            end: new Date('2024-12-24'),
        },
        {
            id: '6',
            calendarId: 'NORMAL',
            title: '알고리즘',
            category: 'allday',
            start: new Date('2024-12-24'),
            end: new Date('2024-12-24'),
        },
    ];

    const theme = {
        common: {
            border: '1px solid #D5D7DA',
            gridSelection: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                border: '3px solid #175CD3',
            },
        },
        month: {
            dayExceptThisMonth: {
                color: '#717680',
            },
        },
    };

    const template = {
        allday(event: EventObject) {
            return `<CalendarTag color="blue">${event.title}</CalendarTag>`;
        },
    };

    const onAfterRenderEvent = (event: EventObject) => {
        console.log(event.title);
    };

    return (
        <div className="flex h-full flex-col gap-4">
            <div>
                <SelectCalender
                    year={date.year}
                    month={date.month}
                    onClickLeft={decreaseDate}
                    onClickRight={increaseDate}
                />
                <Button>일정 생성</Button>
            </div>
            <div className="flex-1 rounded-lg border border-gray-300 bg-white p-1">
                <Calendar
                    ref={calendarRef}
                    height="100%"
                    view="month"
                    month={{
                        dayNames: [
                            'SUN',
                            'MON',
                            'TUE',
                            'WED',
                            'THU',
                            'FRI',
                            'SAT',
                        ],
                    }}
                    calendars={calendars}
                    events={initialEvents}
                    onAfterRenderEvent={onAfterRenderEvent}
                    theme={theme}
                    template={template}
                />
            </div>
        </div>
    );
};

export default MainCalendar;
