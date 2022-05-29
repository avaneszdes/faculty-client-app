import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {SendComment} from "../../Redux/Faculty/Faculty-actions";
import {
    SEND_COMMENT,
    SEND_COMMENT_SUCCEED
} from "../../Redux/Faculty/Faculty-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* sendCommentWorker(action: SendComment) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.sendComment + action.payload.userId,
        data: { receiverId : action.payload.receiverId, comment: action.payload.comment}
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: SEND_COMMENT_SUCCEED, payload:  response.data})
        yield Alert("Комментарий успешно отпрален!", 3000, true)
    }catch (e: any){
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* sendCommentWatcher() {
    yield takeEvery(SEND_COMMENT, sendCommentWorker)
}
