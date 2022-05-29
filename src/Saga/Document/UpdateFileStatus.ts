import axios, {AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
  UPDATE_FILE_STATUS_BY_ID,
} from "../../Redux/Document/Document-constants";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {UpdateFileStatusById} from "../../Redux/Document/Document-action";

function* updateFileStatusByIdWorker(action: UpdateFileStatusById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.updateFileStatus,
        data: action.payload
    }

    try {
        yield call(axios.create().request, request)
        yield Alert("Статус документа успешно изменен!", 3000, true)
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateFileStatusByIdWatcher() {
    yield takeEvery(UPDATE_FILE_STATUS_BY_ID, updateFileStatusByIdWorker)
}
