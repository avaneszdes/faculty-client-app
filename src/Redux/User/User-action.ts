import {
    CREATE_USER,
    CREATE_USER_SUCCEED,
    DELETE_USER,
    DELETE_USER_SUCCEED,
    EDIT_USER,
    EDIT_USER_SUCCEED, GET_TEACHER_FOR_STUDENT, GET_TEACHER_FOR_STUDENT_SUCCEED, GET_TEACHERS, GET_TEACHERS_SUCCEED,
    GET_USER_BY_ID,
    GET_USER_BY_ID_SUCCEED,
    GET_USER_BY_LOGIN,
    GET_USER_BY_LOGIN_SUCCEED, GET_USERS_BY_GROUP, GET_USERS_BY_GROUP_SUCCEED, IMPORT_STUDENTS, IMPORT_STUDENTS_SUCCEED
} from "./User-constants";
import {ICreateUserInterface, ICsvFileUpload, IUserInterface} from "./User-interfaces";

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
    payload: string
}

export interface DeleteUserSucceed {
    type: typeof DELETE_USER_SUCCEED,
    payload: string
}

export interface GetUserByLogin {
    type: typeof GET_USER_BY_LOGIN,
    payload: string
}

export interface GetUserByLoginSucceed {
    type: typeof GET_USER_BY_LOGIN_SUCCEED,
    payload: IUserInterface
}

export interface GetUserById {
    type: typeof GET_USER_BY_ID,
    payload: number
}

export interface GetUserByIdSucceed {
    type: typeof GET_USER_BY_ID_SUCCEED,
    payload: IUserInterface
}

export interface GetTeachers {
    type: typeof GET_TEACHERS,
    payload: number
}

export interface GetTeachersSucceed {
    type: typeof GET_TEACHERS_SUCCEED,
    payload: IUserInterface[]
}

export interface GetStudentsByGroup {
    type: typeof GET_USERS_BY_GROUP,
    payload: string
}

export interface GetStudentsByGroupSucceed {
    type: typeof GET_USERS_BY_GROUP_SUCCEED,
    payload: IUserInterface[]
}

export interface GetTeacherForStudent {
    type: typeof GET_TEACHER_FOR_STUDENT,
    payload: number
}

export interface GetTeacherForStudentSucceed {
    type: typeof GET_TEACHER_FOR_STUDENT_SUCCEED,
    payload: IUserInterface
}

export interface ImportStudents {
    type: typeof IMPORT_STUDENTS,
    payload: ICsvFileUpload
}

export interface ImportStudentsSucceed {
    type: typeof IMPORT_STUDENTS_SUCCEED,
    payload: IUserInterface[]
}

export type UserActionTypes =
    CreateUser
    | GetTeacherForStudent
    | GetTeacherForStudentSucceed
    | GetStudentsByGroup
    | GetStudentsByGroupSucceed
    | GetUserById
    | GetTeachersSucceed
    | GetTeachers
    | GetUserByIdSucceed
    | GetUserByLogin
    | GetUserByLoginSucceed
    | DeleteUserSucceed
    | CreateUserSucceed
    | DeleteUser
    | EditUserSucceed
    | EditUser
    | ImportStudents
    | ImportStudentsSucceed

