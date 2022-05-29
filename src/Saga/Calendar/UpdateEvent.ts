import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {UpdateEvent} from "../../Redux/Calendar/Calendar-actions";
import {UPDATE_EVENT, UPDATE_EVENT_SUCCEED} from "../../Redux/Calendar/Calendar-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* updateEventWorker(action: UpdateEvent) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.updateEvent,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: UPDATE_EVENT_SUCCEED, payload: response.data})
        yield Alert('Событие успешно добавлено!', 3000, true)
    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateEventWatcher() {
    yield takeEvery(UPDATE_EVENT, updateEventWorker)
}
