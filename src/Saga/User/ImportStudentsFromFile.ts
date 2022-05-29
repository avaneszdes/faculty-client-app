import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {ImportStudents} from "../../Redux/User/User-action";
import {IMPORT_STUDENTS, IMPORT_STUDENTS_SUCCEED,} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* importStudentsWorker(action: ImportStudents) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.importStudents + action.payload.groupCode + '&practiceId=' + action.payload.practiceId,
        data: action.payload.file
    }

    try {

        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200) {
            yield put({type: IMPORT_STUDENTS_SUCCEED, payload: response.data.users})
        }

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* importStudentsWatcher() {
    yield takeEvery(IMPORT_STUDENTS, importStudentsWorker)
}
