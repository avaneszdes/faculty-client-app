import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {GET_PRACTICES, GET_PRACTICES_SUCCEED,} from "../../Redux/Practice/Practice-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getAllPracticesWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getAllPractices,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_PRACTICES_SUCCEED, payload: response.data.practiceDtos})

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getAllPracticesWatcher() {
    yield takeEvery(GET_PRACTICES, getAllPracticesWorker)
}
