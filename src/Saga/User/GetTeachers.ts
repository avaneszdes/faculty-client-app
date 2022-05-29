import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {
    GET_TEACHERS, GET_TEACHERS_SUCCEED,
} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getTeachersWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getTeachers,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_TEACHERS_SUCCEED, payload: response.data.users})
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getTeachersWatcher() {
    yield takeEvery(GET_TEACHERS, getTeachersWorker)
}
