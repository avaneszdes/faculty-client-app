import {
    ADD_SPECIALITY, ADD_SPECIALITY_SUCCEED, DELETE_SPECIALITY,
    DELETE_SPECIALITY_SUCCEED,
    GET_SPECIALITIES,
    GET_SPECIALITIES_SUCCEED, GET_SPECIALITY,
    GET_SPECIALITY_SUCCEED,
    UPDATE_SPECIALITY,
    UPDATE_SPECIALITY_SUCCEED
} from "./Specionality-constants";
import {ISpecialityInterface} from "./Specionality-interfaces";

export interface GetSpecialities {
    type: typeof GET_SPECIALITIES,
    payload: number
}

export interface GetSpecialitiesSucceed {
    type: typeof GET_SPECIALITIES_SUCCEED,
    payload: ISpecialityInterface[]
}

export interface UpdateSpeciality {
    type: typeof UPDATE_SPECIALITY,
    payload: ISpecialityInterface
}

export interface UpdateSpecialitySucceed {
    type: typeof UPDATE_SPECIALITY_SUCCEED,
    payload: ISpecialityInterface
}

export interface AddSpeciality {
    type: typeof ADD_SPECIALITY,
    payload: string
}

export interface AddSpecialitySucceed {
    type: typeof ADD_SPECIALITY_SUCCEED,
    payload: ISpecialityInterface
}

export interface DeleteSpeciality {
    type: typeof DELETE_SPECIALITY,
    payload: number
}

export interface DeleteSpecialitySucceed {
    type: typeof DELETE_SPECIALITY_SUCCEED,
    payload: number
}

export interface GetSpecialityById {
    type: typeof GET_SPECIALITY,
    payload: number
}

export interface GetSpecialityByIdSucceed {
    type: typeof GET_SPECIALITY_SUCCEED,
    payload: ISpecialityInterface
}


export type SpecialityActionTypes =
    | GetSpecialityById
    | GetSpecialityByIdSucceed
    | DeleteSpeciality
    | DeleteSpecialitySucceed
    | AddSpeciality
    | AddSpecialitySucceed
    | UpdateSpeciality
    | UpdateSpecialitySucceed
    | GetSpecialities
    | GetSpecialitiesSucceed
