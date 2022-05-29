import Kalend, {CalendarEvent, CalendarView, OnEventClickData, OnNewEventClickData,} from 'kalend';
import 'kalend/dist/styles/index.css';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {
    CLEAR_TEMP_EVENT,
    CREATE_EVENT,
    DELETE_EVENT,
    SET_TEMP_EVENT,
    UPDATE_EVENT,
} from "../../Redux/Calendar/Calendar-constants";
import {useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import {BaseCalendarEvent, EventToCreate} from "../../Redux/Calendar/Calendar-interfaces";
import DetailedInformationWithUpdateDialog from "./DetailedInformationWithUpdateDialog";

export default function Calendar() {

    const calendar = useSelector((rootState: IRootState) => rootState.calendar)
    const user = useSelector((rootState: IRootState) => rootState.user.user)
    const dispatch = useDispatch()
    const [eventPopup, setEventPopUp] = useState({createPopUpOpen: false, editPopUpOpen: false})

    const onNewEventClick = (data: OnNewEventClickData) => {
        const newEvent: EventToCreate = {
            startAt: data.startAt,
            endAt: data.endAt,
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'new Event',
            color: 'red',
            calendarId: 'work',
            practiceId: user?.practiceId,
            userId: user?.id
        }

        dispatch({type: SET_TEMP_EVENT, payload: newEvent})
        setEventPopUp({...eventPopup, createPopUpOpen: true})
    };

    const createEvent = (data: EventToCreate) => {
        const event: EventToCreate = calendar.currentEvent!
        const newEvent: EventToCreate = {
            color: data.color === '' ? 'green' : data.color,
            startAt: event.startAt,
            endAt: event.endAt,
            calendarId: event.calendarId,
            summary: data.summary,
            timezoneStartAt: event.timezoneStartAt,
            practiceId: user?.practiceId ?? 1,
            userId: user?.id
        }

        dispatch({type: CREATE_EVENT, payload: newEvent})
        dispatch({type: CLEAR_TEMP_EVENT, payload: null})
    }

    const onEventClick = (data: OnEventClickData) => {
        dispatch({type: SET_TEMP_EVENT, payload: data})
        setEventPopUp({...eventPopup, editPopUpOpen: true})
    };

    const clearTempDataAndClosePopUp = () => {
        setEventPopUp({...eventPopup, editPopUpOpen: false, createPopUpOpen: false})
        dispatch({type: CLEAR_TEMP_EVENT, payload: null})
    }

    const deleteEvent = (id: number) => {
        setEventPopUp({...eventPopup, editPopUpOpen: false, createPopUpOpen: false})
        dispatch({type: DELETE_EVENT, payload: id})
    }

    const updateEvent = (event: BaseCalendarEvent) => {
        dispatch({type: UPDATE_EVENT, payload: event})
    }

    const onDragged = (prevEvent: CalendarEvent, updatedEvent: CalendarEvent, events: any) => {
        const event: BaseCalendarEvent = {
            id: events[2].id,
            calendarId: events[2].calendarId,
            startAt: events[2].startAt,
            endAt: events[2].endAt,
            color: prevEvent.color,
            summary: events[2].summary,
            timezoneStartAt: 'Europe/Minsk'
        }

        dispatch({type: UPDATE_EVENT, payload: event})
    }

    return (
        <>
            <Kalend
                onEventClick={onEventClick}
                onNewEventClick={onNewEventClick}
                events={calendar.events}
                initialDate={new Date().toISOString()}
                hourHeight={120}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                timeFormat={'12'}
                weekDayStart={'Monday'}
                language={'ru'}
                showTimeLine={true}
                onEventDragFinish={onDragged}
                focusHour={9}
                style={{primaryColor: 'green', baseColor: 'green', inverseBaseColor: 'green'}}
                colors={{dark: {primaryColor: 'red'}, light: {primaryColor: 'green'}}}
            />

            {eventPopup.createPopUpOpen &&
            <CreateEventDialog
                createEvent={createEvent}
                open={eventPopup.createPopUpOpen}
                close={clearTempDataAndClosePopUp}/>
            }

            {eventPopup.editPopUpOpen &&
            <DetailedInformationWithUpdateDialog
                close={clearTempDataAndClosePopUp}
                open={eventPopup.editPopUpOpen}
                deleteEvent={deleteEvent}
                editEvent={updateEvent}/>
            }
        </>
    );
}
