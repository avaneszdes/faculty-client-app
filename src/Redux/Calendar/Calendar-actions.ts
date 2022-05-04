import {
    CLEAR_TEMP_EVENT,
    CREATE_EVENT,
    CREATE_EVENT_SUCCEED,
    DELETE_EVENT,
    DELETE_EVENT_SUCCEED,
    SET_TEMP_EVENT,
    UPDATE_EVENT,
    UPDATE_EVENT_SUCCEED
} from "./Calendar-constants";
import {BaseCalendarEvent, EventToCreate} from "./Calendar-interfaces";

export interface CreateEventSucceed {
    type: typeof CREATE_EVENT,
    payload: BaseCalendarEvent
}

export interface CreateEvent {
    type: typeof CREATE_EVENT_SUCCEED,
    payload: EventToCreate
}

export interface SetTempEvent {
    type: typeof SET_TEMP_EVENT,
    payload: EventToCreate | BaseCalendarEvent
}

export interface ClearTempEvent {
    type: typeof CLEAR_TEMP_EVENT,
    payload: null
}

export interface UpdateEvent {
    type: typeof UPDATE_EVENT,
    payload: BaseCalendarEvent
}

export interface UpdateEventSucceed {
    type: typeof UPDATE_EVENT_SUCCEED,
    payload: BaseCalendarEvent
}

export interface DeleteEvent {
    type: typeof DELETE_EVENT,
    payload: number
}

export interface UpdDeleteEventSucceed {
    type: typeof DELETE_EVENT_SUCCEED,
    payload: number
}


export type CalendarActionTypes =
    CreateEvent
    | CreateEventSucceed
    | SetTempEvent
    | UpdateEvent
    | UpdateEventSucceed
    | ClearTempEvent
    | DeleteEvent
    | UpdDeleteEventSucceed
