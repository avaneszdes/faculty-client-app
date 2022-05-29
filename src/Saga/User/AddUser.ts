import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {CreateUser} from "../../Redux/User/User-action";
import {
    CREATE_USER,
    CREATE_USER_SUCCEED,
} from "../../Redux/User/User-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* addUserWorker(action: CreateUser) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.createUser,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(axios.create().request, request)

        if(response.data.message !== "Added successfully" ){
            yield Alert(response.data.message, 3000, false)
        }
        console.log(action.payload.groupCode)
        if(action.payload.groupCode !== ''){
            yield put({type: CREATE_USER_SUCCEED, payload: response.data})
        }else if(action.payload.groupCode === ''){
            yield Alert("Пользователь успешно создан!", 3000, true)
        }
    } catch (e: any) {
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addUserWatcher() {
    yield takeEvery(CREATE_USER, addUserWorker)
}
