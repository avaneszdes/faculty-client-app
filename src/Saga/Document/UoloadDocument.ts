import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {UPLOAD_DOCUMENT, UPLOAD_DOCUMENT_SUCCEED} from "../../Redux/Document/Document-constants";
import {UploadDocument} from "../../Redux/Document/Document-action";
import {IDocument} from "../../Redux/Document/Document-interfaces";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* uploadDocumentWorker(action: UploadDocument) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
        url: links.uploadFile + action.payload.practiceId + '&doctypeId=' + action.payload.docTypeId + '&userId=' + action.payload.userId,
        data: action.payload.file
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: UPLOAD_DOCUMENT_SUCCEED, payload: response.data as IDocument})
        yield Alert('Вы успешно сохранили документ!', 3000, true)
    } catch (e: any) {

        const {response} = e
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* uploadDocumentWatcher() {
    yield takeEvery(UPLOAD_DOCUMENT, uploadDocumentWorker)
}
