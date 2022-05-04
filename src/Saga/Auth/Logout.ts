import {takeEvery} from "redux-saga/effects";
import history from '../../Components/History/history'
import {LOG_OUT} from "../../Redux/Auth/Auth-constants";

function* logOutWorker() {
  yield history.push('/')
}

export function* logOutWorkerWatcher() {
    yield takeEvery(LOG_OUT, logOutWorker)
}
