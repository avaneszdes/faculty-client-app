import {all} from 'redux-saga/effects'
import {watchAuthorization} from "./Auth/Authorization";
import {logOutWorkerWatcher} from "./Auth/Logout";

export function* rootSaga() {
    yield all([
        logOutWorkerWatcher(),
        watchAuthorization(),
    ]);
}
