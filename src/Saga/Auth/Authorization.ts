import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import httpRequest from "../httpConfig";
import jwt_decode, {JwtPayload} from "jwt-decode";
import history from '../../Components/History/history'
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Global";
import {LOADING_END_SUCCEED, LOADING_START_SUCCEED, SET_ALERT_MESSAGE_SUCCEED} from "../../Redux/Alert/Alert-constants";
import {AuthorizationAction} from "../../Redux/Auth/Auth-action";
import {AUTHORIZATION, AUTHORIZATION_SUCCEED} from "../../Redux/Auth/Auth-constants";

export interface ResponseJwt extends JwtPayload {
    login: string,
    role: string
    id: number
    exp: number
}

function* authorizationWorker(action: AuthorizationAction) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const getTokenHttpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${constants.host}${constants.authorize}`,
        data: action.payload
    }
    yield put({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  "", type: false}})

    try {
        const response: AxiosResponse = yield call(() => httpRequest(getTokenHttpConfig));
        const profile: ResponseJwt = jwt_decode(response.data.token)
        localStorage.setItem('token', response.data.token)

        yield put({
            type: AUTHORIZATION_SUCCEED, payload: {
                token: response.data.token,
                role: profile.role,
                login: profile.login,
                photo: '',
                id: profile.id,
                exp: profile.exp
            }
        })

        history.push("/")

    } catch (err ) {
        const er = err as AxiosError
        yield Alert(er.message ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}
