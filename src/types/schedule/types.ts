export type ScheduleEvent = {
    scheduleId: string;
    content: string;
    startDate: Date;
    endDate: Date;
    scheduleType: string;
    publicAccess: boolean;
    userId: string;
    generationId: string;
};
