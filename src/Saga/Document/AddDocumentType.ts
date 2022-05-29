import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
    ADD_DOCUMENT_TYPE, ADD_DOCUMENT_TYPE_SUCCEED,
} from "../../Redux/Document/Document-constants";
import {AddDocumentType} from "../../Redux/Document/Document-action";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* addDocumentTypeWorker(action: AddDocumentType) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.addDocumentType,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)

        yield put({type: ADD_DOCUMENT_TYPE_SUCCEED, payload: response.data})
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addDocumentTypeWatcher() {
    yield takeEvery(ADD_DOCUMENT_TYPE, addDocumentTypeWorker)
}
