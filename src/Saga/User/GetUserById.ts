import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {GetUserById} from "../../Redux/User/User-action";
import {GET_USER_BY_ID, GET_USER_BY_ID_SUCCEED} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getUserByIdWorker(action: GetUserById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getUserById + action.payload,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_USER_BY_ID_SUCCEED, payload: response.data})
    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getUserByIdWatcher() {
    yield takeEvery(GET_USER_BY_ID, getUserByIdWorker)
}
