import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {
    GET_TEACHER_FOR_STUDENT, GET_TEACHER_FOR_STUDENT_SUCCEED,
} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {GetTeacherForStudent} from "../../Redux/User/User-action";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getTeacherForStudentWorker(action: GetTeacherForStudent) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getTeacherForStudent + action.payload,
    }

    try {

        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200){
            yield put({type: GET_TEACHER_FOR_STUDENT_SUCCEED, payload: response.data})
        }

    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;
        yield Alert(errorObject.data + '  ' + errorObject.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getTeacherForStudentWatcher() {
    yield takeEvery(GET_TEACHER_FOR_STUDENT, getTeacherForStudentWorker)
}
