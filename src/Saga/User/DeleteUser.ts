import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {DeleteUser} from "../../Redux/User/User-action";
import {
    DELETE_USER, DELETE_USER_SUCCEED,
} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* deleteUserWorker(action: DeleteUser) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: links.deleteUser,
        data: {login: action.payload}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200){
            yield put({type: DELETE_USER_SUCCEED, payload: action.payload})
        }

    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;
        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteUserWatcher() {
    yield takeEvery(DELETE_USER, deleteUserWorker)
}
