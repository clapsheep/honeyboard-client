export type ScheduleEvent = {
    scheduleId?: number;
    content: string;
    startDate: Date;
    endDate: Date;
    scheduleType: string;
    publicAccess: boolean;
    userId: string;
    generationId: string;
};
