import {
    CLEAR_ALERT_MESSAGE_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    SET_ALERT_MESSAGE_SUCCEED
} from "./Alert-constants";

export interface ClearAlertMessage {
    type: typeof CLEAR_ALERT_MESSAGE_SUCCEED,
    payload: string
}

export interface SetAlertMessage {
    type: typeof SET_ALERT_MESSAGE_SUCCEED,
    payload: string
}

export interface LoadingStartSucceed {
    type: typeof LOADING_START_SUCCEED,
    payload: boolean
}

export interface LoadingEndSucceed {
    type: typeof LOADING_END_SUCCEED,
    payload: boolean
}

export type AlertActionTypes =
    ClearAlertMessage
    | SetAlertMessage
    | LoadingStartSucceed
    | LoadingEndSucceed
