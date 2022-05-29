
import {AlertActionTypes} from "./Alert-actions";
import {IAlertState} from "./Alert-interfaces";
import {
    CLEAR_ALERT_MESSAGE_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    SET_ALERT_MESSAGE_SUCCEED
} from "./Alert-constants";

const initialState: IAlertState = {
    alert: {message: '', type: false},
    loading: false
}

const alert = (state = initialState, action: AlertActionTypes) => {

    switch (action.type) {

        case LOADING_START_SUCCEED:
            return {...state, loading: action.payload}

        case LOADING_END_SUCCEED:
            return {...state, loading: action.payload}

        case SET_ALERT_MESSAGE_SUCCEED:
            return {...state, alert: action.payload}

        case CLEAR_ALERT_MESSAGE_SUCCEED:
            return {...state, alert: action.payload}

        default:
            return state
    }
}

export default alert
