import {
    ADD_STUDENT_TO_LIST, ADD_STUDENT_TO_LIST_SUCCEED, CREATE_GROUP, CREATE_GROUP_SUCCEED,
    DELETE_STUDENT_FROM_LIST, DELETE_STUDENT_FROM_LIST_SUCCEED, EDIT_STUDENT, EDIT_STUDENT_SUCCEED,
    GET_USERS_BY_GROUP,
    GET_USERS_BY_GROUP_SUCCEED,
    UPLOAD_DOCUMENT,
    UPLOAD_DOCUMENT_SUCCEED
} from "./Faculty-constants";
import {IGroup, IStudent} from "./Faculty-interfaces";

export interface GetStudentsByGroup {
    type: typeof GET_USERS_BY_GROUP,
    payload: string
}

export interface GetStudentsByGroupSucceed {
    type: typeof GET_USERS_BY_GROUP_SUCCEED,
    payload: {}
}

export interface UploadDocument {
    type: typeof UPLOAD_DOCUMENT,
    payload: string
}

export interface UploadDocumentSucceed {
    type: typeof UPLOAD_DOCUMENT_SUCCEED,
    payload: string
}

export interface DeleteStudentFromList {
    type: typeof DELETE_STUDENT_FROM_LIST,
    payload: number
}

export interface DeleteStudentFromListSucceed {
    type: typeof DELETE_STUDENT_FROM_LIST_SUCCEED,
    payload: number
}

export interface AddStudentToList {
    type: typeof ADD_STUDENT_TO_LIST,
    payload: {
        name: string
        surname: string
        middleName: string
        username: string
        password: string
    }
}

export interface AddStudentToListSucceed {
    type: typeof ADD_STUDENT_TO_LIST_SUCCEED,
    payload: IStudent
}

export interface EditStudent {
    type: typeof EDIT_STUDENT,
    payload: IStudent
}

export interface EditStudentSucceed {
    type: typeof EDIT_STUDENT_SUCCEED,
    payload: IStudent
}

export interface CreateGroup {
    type: typeof CREATE_GROUP,
    payload: string
}

export interface CreateGroupSucceed {
    type: typeof CREATE_GROUP_SUCCEED,
    payload: IGroup
}

export type FacultyActionTypes =
    AddStudentToList
    | CreateGroupSucceed
    | CreateGroup
    | EditStudentSucceed
    | EditStudent
    | AddStudentToListSucceed
    | DeleteStudentFromListSucceed
    | DeleteStudentFromList
    | UploadDocumentSucceed
    | UploadDocument
    | GetStudentsByGroup
    | GetStudentsByGroupSucceed
