import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {
    ADD_PRACTICE, ADD_PRACTICE_SUCCEED,
} from "../../Redux/Practice/Practice-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {AddPractice} from "../../Redux/Practice/Practice-action";

function* addPracticeWorker(action: AddPractice) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.addPractice,
        data: {name: action.payload}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: ADD_PRACTICE_SUCCEED, payload: response.data})
        yield Alert("Практика успешно создана", 3000, true)


    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addPracticeWatcher() {
    yield takeEvery(ADD_PRACTICE, addPracticeWorker)
}
