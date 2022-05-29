import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
    GET_DOCUMENT_TYPES,
    GET_DOCUMENT_TYPES_SUCCEED,
} from "../../Redux/Document/Document-constants";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* getDocumentTypesWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.getDocumentTypes
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_DOCUMENT_TYPES_SUCCEED, payload: response.data.doctypeDtos})
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getDocumentTypesWatcher() {
    yield takeEvery(GET_DOCUMENT_TYPES, getDocumentTypesWorker)
}
