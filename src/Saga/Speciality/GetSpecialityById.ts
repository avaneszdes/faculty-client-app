import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {Alert} from "../Utils/SetAlert";
import {GET_SPECIALITY, GET_SPECIALITY_SUCCEED} from "../../Redux/Specionality/Specionality-constants";
import {GetSpecialityById} from "../../Redux/Specionality/Specionality-action";

function* getSpecialityByIdWorker(action: GetSpecialityById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'GET',
        url: links.getSpecialityById + action.payload,
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: GET_SPECIALITY_SUCCEED, payload: response.data})
    }catch (e: any){
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getSpecialityByIdWatcher() {
    yield takeEvery(GET_SPECIALITY, getSpecialityByIdWorker)
}
