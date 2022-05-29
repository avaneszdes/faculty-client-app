import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
   GET_DOCUMENTS_BY_USER_ID, GET_DOCUMENTS_BY_USER_ID_SUCCEED,
} from "../../Redux/Document/Document-constants";
import { GetDocumentsByUserId} from "../../Redux/Document/Document-action";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getDocumentsByUserIdWorker(action: GetDocumentsByUserId) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.getDocumentsByUserId + action.payload,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_DOCUMENTS_BY_USER_ID_SUCCEED, payload: response.data.fullDocumentDtos})
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getDocumentsByUserIdWatcher() {
    yield takeEvery(GET_DOCUMENTS_BY_USER_ID, getDocumentsByUserIdWorker)
}
