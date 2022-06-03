import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {DELETE_SPECIALITY, DELETE_SPECIALITY_SUCCEED} from "../../Redux/Specionality/Specionality-constants";
import {DeleteSpeciality} from "../../Redux/Specionality/Specionality-action";

function* deleteSpecialityWorker(action: DeleteSpeciality) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: links.deleteSpeciality,
        data: {id: + action.payload}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        if (response.status === 200) {
            yield put({type: DELETE_SPECIALITY_SUCCEED, payload: action.payload})
        }

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteSpecialityWatcher() {
    yield takeEvery(DELETE_SPECIALITY, deleteSpecialityWorker)
}
