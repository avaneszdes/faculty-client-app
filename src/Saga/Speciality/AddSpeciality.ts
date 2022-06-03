import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {ADD_SPECIALITY, ADD_SPECIALITY_SUCCEED} from "../../Redux/Specionality/Specionality-constants";
import {AddSpeciality} from "../../Redux/Specionality/Specionality-action";

function* addSpecialityWorker(action: AddSpeciality) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.addSpeciality,
        data: {name: action.payload}
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: ADD_SPECIALITY_SUCCEED, payload: response.data})
        yield Alert("Специальность успешно создана", 3000, true)


    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addSpecialityWatcher() {
    yield takeEvery(ADD_SPECIALITY, addSpecialityWorker)
}
