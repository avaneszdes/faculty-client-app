import axios, {AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
    DELETE_DOCUMENT_TYPE, DELETE_DOCUMENT_TYPE_SUCCEED,
} from "../../Redux/Document/Document-constants";
import {DeleteDocumentType} from "../../Redux/Document/Document-action";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* deleteDocumentTypeWorker(action: DeleteDocumentType) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.deleteDocumentType,
        data: {id: action.payload}
    }

    try {
        yield call(axios.create().request, request)
        yield put({type: DELETE_DOCUMENT_TYPE_SUCCEED, payload: action.payload})
    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteDocumentTypeWatcher() {
    yield takeEvery(DELETE_DOCUMENT_TYPE, deleteDocumentTypeWorker)
}
