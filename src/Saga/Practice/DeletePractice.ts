import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {
   DELETE_PRACTICE, DELETE_PRACTICE_SUCCEED,
} from "../../Redux/Practice/Practice-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {DeletePractice} from "../../Redux/Practice/Practice-action";

function* deletePracticeWorker(action: DeletePractice) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: links.deletePractice ,
        data: {id: + action.payload}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200){
            yield put({type: DELETE_PRACTICE_SUCCEED, payload: action.payload})
        }

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deletePracticeWatcher() {
    yield takeEvery(DELETE_PRACTICE, deletePracticeWorker)
}
