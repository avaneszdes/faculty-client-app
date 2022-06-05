import {
    ADD_PRACTICE,
    ADD_PRACTICE_SUCCEED, CREATE_PRACTICE_LOCATION, CREATE_PRACTICE_LOCATION_SUCCEED,
    DELETE_PRACTICE,
    DELETE_PRACTICE_SUCCEED, GET_PRACTICE_BY_USER_ID, GET_PRACTICE_BY_USER_ID_SUCCEED,
    GET_PRACTICES, GET_PRACTICES_SUCCEED,
    UPDATE_PRACTICE, UPDATE_PRACTICE_LOCATION, UPDATE_PRACTICE_LOCATION_SUCCEED,
    UPDATE_PRACTICE_SUCCEED
} from "./Practice-constants";
import {INewPracticeInterface, IPracticeInterface, IPracticeLocationInterface} from "./Practice-interfaces";

export interface GetPractices {
    type: typeof GET_PRACTICES,
    payload: number
}

export interface GetPracticesSucceed {
    type: typeof GET_PRACTICES_SUCCEED,
    payload: IPracticeInterface[]
}

export interface UpdatePractice {
    type: typeof UPDATE_PRACTICE,
    payload: IPracticeInterface
}

export interface UpdatePracticeSucceed {
    type: typeof UPDATE_PRACTICE_SUCCEED,
    payload: IPracticeInterface
}

export interface AddPractice {
    type: typeof ADD_PRACTICE,
    payload: INewPracticeInterface
}

export interface AddPracticeSucceed {
    type: typeof ADD_PRACTICE_SUCCEED,
    payload: IPracticeInterface
}

export interface DeletePractice {
    type: typeof DELETE_PRACTICE,
    payload: number
}

export interface DeletePracticeSucceed {
    type: typeof DELETE_PRACTICE_SUCCEED,
    payload: number
}

export interface GetPracticeByUserId {
    type: typeof GET_PRACTICE_BY_USER_ID,
    payload: number
}

export interface GetPracticeByUserIdSucceed {
    type: typeof GET_PRACTICE_BY_USER_ID_SUCCEED,
    payload: IPracticeInterface
}

export interface CreatePracticeLocation {
    type: typeof CREATE_PRACTICE_LOCATION,
    payload: {location: string, status: 'NEW', userId: number}
}

export interface CreatePracticeLocationSucceed {
    type: typeof CREATE_PRACTICE_LOCATION_SUCCEED,
    payload: IPracticeLocationInterface
}

export interface UpdatePracticeLocation {
    type: typeof UPDATE_PRACTICE_LOCATION,
    payload: IPracticeLocationInterface
}

export interface UpdatePracticeLocationSucceed {
    type: typeof UPDATE_PRACTICE_LOCATION_SUCCEED,
    payload: IPracticeLocationInterface
}


export type PracticeActionTypes =
    GetPracticeByUserId
    | GetPracticeByUserIdSucceed
    | UpdatePracticeLocationSucceed
    | UpdatePracticeLocation
    | CreatePracticeLocationSucceed
    | CreatePracticeLocation
    | GetPractices
    | GetPracticesSucceed
    | UpdatePractice
    | UpdatePracticeSucceed
    | AddPractice
    | AddPracticeSucceed
    | DeletePractice
    | DeletePracticeSucceed
