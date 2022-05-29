import axios, { AxiosRequestConfig } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {DeleteEvent} from "../../Redux/Calendar/Calendar-actions";
import {
    DELETE_EVENT, DELETE_EVENT_SUCCEED,
} from "../../Redux/Calendar/Calendar-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* deleteEventsWorker(action: DeleteEvent) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: links.deleteEvent,
        data: { "eventCalendarId": action.payload }
    }

    try {
        yield call(axios.create().request, request)
        yield put({type: DELETE_EVENT_SUCCEED, payload: action.payload})
        yield Alert('Событие успешно удалено!', 3000, true)
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteEventsWatcher() {
    yield takeEvery(DELETE_EVENT, deleteEventsWorker)
}
