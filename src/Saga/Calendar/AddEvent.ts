import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {CreateEvent} from "../../Redux/Calendar/Calendar-actions";
import {
    CREATE_EVENT,
    CREATE_EVENT_SUCCEED,
} from "../../Redux/Calendar/Calendar-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* createEventWorker(action: CreateEvent) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.addEvent,
        data: {...action.payload, id: null}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: CREATE_EVENT_SUCCEED, payload: response.data})
        yield Alert('Событие успешно создано!', 3000, false)
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* createEventWatcher() {
    yield takeEvery(CREATE_EVENT, createEventWorker)
}
