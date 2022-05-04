import {
    CREATE_USER,
    CREATE_USER_SUCCEED,
    DELETE_USER,
    DELETE_USER_SUCCEED,
    EDIT_USER,
    EDIT_USER_SUCCEED, GET_USER_BY_LOGIN, GET_USER_BY_LOGIN_SUCCEED
} from "./User-constants";
import {ICreateUserInterface, IUserInterface} from "./User-interfaces";

export interface CreateUser {
    type: typeof CREATE_USER,
    payload: ICreateUserInterface
}
export interface CreateUserSucceed {
    type: typeof CREATE_USER_SUCCEED,
    payload: IUserInterface
}

export interface EditUser {
    type: typeof EDIT_USER,
    payload: IUserInterface
}
export interface EditUserSucceed {
    type: typeof EDIT_USER_SUCCEED,
    payload: IUserInterface
}

export interface DeleteUser {
    type: typeof DELETE_USER,
    payload: number
}
export interface DeleteUserSucceed {
    type: typeof DELETE_USER_SUCCEED,
    payload: number
}

export interface GetUserByLogin {
    type: typeof GET_USER_BY_LOGIN,
    payload: string
}
export interface GetUserByLoginSucceed {
    type: typeof GET_USER_BY_LOGIN_SUCCEED,
    payload: IUserInterface
}


export type UserActionTypes =
    CreateUser
    | GetUserByLogin
    | GetUserByLoginSucceed
    | DeleteUserSucceed
    | CreateUserSucceed
    | DeleteUser
    | EditUserSucceed
    | EditUser

