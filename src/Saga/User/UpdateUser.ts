import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {EditUser} from "../../Redux/User/User-action";
import {
    EDIT_USER, EDIT_USER_SUCCEED,
} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* updateUserWorker(action: EditUser) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: links.updateUser,
        data: action.payload
    }

    try {

        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200){
            yield put({type: EDIT_USER_SUCCEED, payload: response.data})
        }

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateUserWatcher() {
    yield takeEvery(EDIT_USER, updateUserWorker)
}
