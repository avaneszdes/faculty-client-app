﻿import axios, {AxiosRequestConfig} from "axios";
import {call, select} from "redux-saga/effects";
import {IRootState} from "../Redux/configureStore";

export default function* httpRequest(requestConfig: AxiosRequestConfig): any {

    const token: string = yield select((x: IRootState) => x.auth);

    if (token !== '') {
        requestConfig.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return yield call(axios.create().request, requestConfig);
}

