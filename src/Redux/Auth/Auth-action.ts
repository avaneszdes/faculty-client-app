import {AUTHORIZATION, AUTHORIZATION_SUCCEED, LOG_OUT} from "./Auth-constants";
import {AuthenticationDto, IAuthInterface} from "./Auth-interfaces";

export interface AuthorizationAction {
    type: typeof AUTHORIZATION,
    payload: AuthenticationDto
}

export interface AuthorizationSucceedAction {
    type: typeof AUTHORIZATION_SUCCEED,
    payload: IAuthInterface
}

export interface LogOut {
    type: typeof LOG_OUT,
    payload: string
}


export type AuthActionTypes =
    LogOut
    | AuthorizationSucceedAction
    | AuthorizationAction

