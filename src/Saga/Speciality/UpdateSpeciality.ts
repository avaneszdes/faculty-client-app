import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {UpdateSpeciality} from "../../Redux/Specionality/Specionality-action";
import {UPDATE_SPECIALITY, UPDATE_SPECIALITY_SUCCEED} from "../../Redux/Specionality/Specionality-constants";

function* updateSpecialityWorker(action: UpdateSpeciality) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: links.updateSpeciality,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: UPDATE_SPECIALITY_SUCCEED, payload: response.data})
        yield Alert("Специальность успешно обновлена!", 3000, true)


    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateSpecialityWatcher() {
    yield takeEvery(UPDATE_SPECIALITY, updateSpecialityWorker)
}
