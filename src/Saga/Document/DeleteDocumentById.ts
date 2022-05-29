import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {
    DELETE_DOCUMENT_BY_ID, DELETE_DOCUMENT_BY_ID_SUCCEED,
} from "../../Redux/Document/Document-constants";
import {DeleteDocumentById} from "../../Redux/Document/Document-action";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* deleteDocumentByIdWorker(action: DeleteDocumentById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: links.deleteDocument + action.payload ,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200){
            yield put({type: DELETE_DOCUMENT_BY_ID_SUCCEED, payload: action.payload})
        }
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteDocumentByIdWatcher() {
    yield takeEvery(DELETE_DOCUMENT_BY_ID, deleteDocumentByIdWorker)
}
