import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { SelectCalender } from '@/components/atoms';
import { useSchedule } from '@/hooks/useSchedule';
import { useScheduleEvents } from '@/hooks/useScheduleEvents';
import { useEffect } from 'react';

const Schedule = () => {
    const { scheduleRef, date, decreaseDate, increaseDate, calendars } =
        useSchedule();
    const {
        events,
        fetchEvents,
        onBeforeCreateEvent,
        onBeforeUpdateEvent,
        onBeforeDeleteEvent,
    } = useScheduleEvents();

    useEffect(() => {
        fetchEvents(date.year, date.month);
    }, [date.year, date.month]);

    // 테마 커스텀
    const theme = {
        common: {
            border: '1px solid #D5D7DA',
        },
        month: {
            dayExceptThisMonth: {
                color: '#717680',
            },
            moreView: {
                border: '1px solid grey',
                boxShadow: '0 2px 6px 0 grey',
                backgroundColor: 'white',
                width: 200,
                height: 200,
            },
        },
    };

    // 템플릿 커스텀
    const template = {
        monthMoreClose() {
            return 'X';
        },
        popupIsAllday() {
            return '하루 종일';
        },
        titlePlaceholder() {
            return '일정';
        },
        locationPlaceholder() {
            return '위치';
        },
        startDatePlaceholder() {
            return '시작 날짜';
        },
        endDatePlaceholder() {
            return '종료 날짜';
        },
        popupSave() {
            return '등록';
        },
        popupUpdate() {
            return '완료';
        },
        popupEdit() {
            return '수정';
        },
        popupDelete() {
            return '삭제';
        },
    };

    return (
        <div className="flex flex-col h-full gap-4 px-6 pt-6 pb-9">
            <SelectCalender
                year={date.year}
                month={date.month}
                onClickLeft={decreaseDate}
                onClickRight={increaseDate}
            />
            <div className="flex-1 p-1 bg-white border border-gray-300 rounded-lg">
                <Calendar
                    ref={scheduleRef}
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
                    events={events}
                    onBeforeCreateEvent={onBeforeCreateEvent}
                    onBeforeUpdateEvent={onBeforeUpdateEvent}
                    onBeforeDeleteEvent={onBeforeDeleteEvent}
                    theme={theme}
                    template={template}
                    useFormPopup={true}
                    useDetailPopup={true}
                />
            </div>
        </div>
    );
};

export default Schedule;
