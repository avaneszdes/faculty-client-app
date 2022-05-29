import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {GetCommentByUserId} from "../../Redux/Faculty/Faculty-actions";
import {
    GET_COMMENTS_BY_USER_ID,
    GET_COMMENTS_BY_USER_ID_SUCCEED
} from "../../Redux/Faculty/Faculty-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getCommentsByUserIdWorker(action: GetCommentByUserId) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getCommentByUserId + action.payload,
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_COMMENTS_BY_USER_ID_SUCCEED, payload: response.data.commentDtoList})
    }catch (err: any){
        const { response } = err
        const { request, ...errorObject } = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status , 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getCommentsByUserIdWatcher() {
    yield takeEvery(GET_COMMENTS_BY_USER_ID, getCommentsByUserIdWorker)
}
