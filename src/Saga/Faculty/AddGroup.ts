import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import links from '../../Constants/Constants'
import {CreateGroup} from "../../Redux/Faculty/Faculty-actions";
import {CREATE_GROUP, CREATE_GROUP_SUCCEED} from "../../Redux/Faculty/Faculty-constants";
import {Alert} from "../Utils/SetAlert";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/Alert/Alert-constants";

function* addGroupWorker(action: CreateGroup) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: links.addGroup,
        data: { code : action.payload.groupCode, specId: action.payload.specId}
    }

    try{
        const response: AxiosResponse = yield call(axios.create().request, request)
        yield put({type: CREATE_GROUP_SUCCEED, payload:  { id : response.data.id, code: response.data.code}})
        yield Alert("Группа успешно добавлена!", 3000, true)
    }catch (e: any){
        yield Alert(e.response.data, 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addGroupWatcher() {
    yield takeEvery(CREATE_GROUP, addGroupWorker)
}
