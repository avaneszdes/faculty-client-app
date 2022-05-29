import axios, {AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {GetStudentsByGroup} from "../../Redux/User/User-action";
import {GET_USERS_BY_GROUP, GET_USERS_BY_GROUP_SUCCEED} from "../../Redux/User/User-constants";

function* getStudentsByGroupWorker(action: GetStudentsByGroup) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getUsersByGroup + action.payload,
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_USERS_BY_GROUP_SUCCEED, payload:  response.data.users})

    }catch (e: any){
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getStudentsByGroupWatcher() {
    yield takeEvery(GET_USERS_BY_GROUP, getStudentsByGroupWorker)
}
