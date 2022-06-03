import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {GET_SPECIALITIES, GET_SPECIALITIES_SUCCEED} from "../../Redux/Specionality/Specionality-constants";

function* getAllSpecialitiesWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getAllSpecialities,
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_SPECIALITIES_SUCCEED, payload: response.data.specDtos})

    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getAllSpecialitiesWatcher() {
    yield takeEvery(GET_SPECIALITIES, getAllSpecialitiesWorker)
}
