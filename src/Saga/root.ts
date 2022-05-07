import {all} from 'redux-saga/effects'
import {logOutWorkerWatcher} from "./Auth/Logout";

export function* rootSaga() {
    yield all([
        logOutWorkerWatcher(),
    ]);
}
