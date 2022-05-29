import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {GetAllEventsById} from "../../Redux/Calendar/Calendar-actions";
import {GET_ALL_EVENTS_BY_USER_ID, GET_ALL_EVENTS_BY_USER_ID_SUCCEED} from "../../Redux/Calendar/Calendar-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getEventsWorker(action: GetAllEventsById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getEvents + action.payload,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_ALL_EVENTS_BY_USER_ID_SUCCEED, payload: response.data.eventCalendars})
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getEventsWatcher() {
    yield takeEvery(GET_ALL_EVENTS_BY_USER_ID, getEventsWorker)
}
