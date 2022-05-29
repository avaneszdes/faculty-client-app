export interface BaseCalendarEvent {
    id: number,
    startAt: string | undefined,
    endAt: string | undefined,
    timezoneStartAt: string,
    summary: string,
    color: string,
    calendarId: string
}

export interface EventToCreate {
    startAt: string | undefined,
    endAt: string | undefined,
    timezoneStartAt: string,
    summary: string,
    color: string,
    calendarId: string
    userId?: string | number,
    practiceId?: string | number
}

export interface ICalendarState{
    events: BaseCalendarEvent[] | []
    currentEvent: EventToCreate | BaseCalendarEvent | null
}
