import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {GET_PRACTICE_BY_USER_ID, GET_PRACTICE_BY_USER_ID_SUCCEED} from "../../Redux/Practice/Practice-constants";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {GetPracticeByUserId} from "../../Redux/Practice/Practice-action";

function* getPracticeByUserIdWorker(action: GetPracticeByUserId) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getPracticeByUserId + action.payload,
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_PRACTICE_BY_USER_ID_SUCCEED, payload: response.data})
    }catch (err: any){
        // yield Alert(errorObject.data.error + '  ' + errorObject.data.status , 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getPracticeByUserIdWatcher() {
    yield takeEvery(GET_PRACTICE_BY_USER_ID, getPracticeByUserIdWorker)
}
