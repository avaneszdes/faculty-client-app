import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {CREATE_PRACTICE_LOCATION, CREATE_PRACTICE_LOCATION_SUCCEED,} from "../../Redux/Practice/Practice-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {CreatePracticeLocation} from "../../Redux/Practice/Practice-action";

function* addPracticeLocationWorker(action: CreatePracticeLocation) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.addPracticeLocation,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: CREATE_PRACTICE_LOCATION_SUCCEED, payload: response.data})
        yield Alert("Место прохождения успешно создано", 3000, true)


    } catch (err: any) {
        const {response} = err
        const {request, ...errorObject} = response;

        yield Alert(errorObject.data.error + '  ' + errorObject.data.status, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addPracticeLocationWatcher() {
    yield takeEvery(CREATE_PRACTICE_LOCATION, addPracticeLocationWorker)
}
