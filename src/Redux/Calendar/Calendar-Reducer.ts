import {
    CLEAR_TEMP_EVENT,
    CREATE_EVENT_SUCCEED,
    DELETE_EVENT_SUCCEED,
    GET_ALL_EVENTS_BY_USER_ID_SUCCEED,
    SET_TEMP_EVENT,
    UPDATE_EVENT_SUCCEED
} from "./Calendar-constants";
import {BaseCalendarEvent, ICalendarState} from "./Calendar-interfaces";
import {CalendarActionTypes} from "./Calendar-actions";

// const calendarNewEvents: BaseCalendarEvent[] = [
//     {
//         id: 1,
//         startAt: '2022-05-02T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         timezoneStartAt: 'Europe/Berlin', // optional
//         summary: 'test',
//         color: 'blue',
//         calendarId: 'work'
//     },
//     {
//         id: 2,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         timezoneStartAt: 'Europe/Berlin', // optional
//         summary: 'test',
//         color: 'blue',
//         calendarId: 'work'
//     }
// ]

const initialState: ICalendarState = {
    events: [],
    currentEvent: null
}


const calendar = (state = initialState, action: CalendarActionTypes) => {

    switch (action.type) {

        case CREATE_EVENT_SUCCEED:
            return {...state, events: [...state.events, action.payload]}

        case GET_ALL_EVENTS_BY_USER_ID_SUCCEED:
            return {...state, events: action.payload}

        case SET_TEMP_EVENT:
            return {...state, currentEvent: action.payload}

        case CLEAR_TEMP_EVENT:
            return {...state, currentEvent: action.payload}

        case DELETE_EVENT_SUCCEED:
            return {...state, events: state.events.filter(x => x.id < action.payload)}

        case UPDATE_EVENT_SUCCEED:
            return {
                ...state, events: state.events.map((event: BaseCalendarEvent) => {
                    if (event.id === action.payload.id) {
                        return action.payload
                    }
                    return event
                })
            }

        default:
            return state
    }
}

export default calendar
