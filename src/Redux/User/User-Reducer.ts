import {
    CREATE_USER_SUCCEED,
    DELETE_USER_SUCCEED,
    EDIT_USER_SUCCEED,
    GET_TEACHER_FOR_STUDENT_SUCCEED,
    GET_TEACHERS_SUCCEED,
    GET_USER_BY_ID_SUCCEED,
    GET_USER_BY_LOGIN_SUCCEED,
    GET_USERS_BY_GROUP_SUCCEED, IMPORT_STUDENTS, IMPORT_STUDENTS_SUCCEED
} from "./User-constants";
import {UserActionTypes} from "./User-action";
import {IUserInterface, IUserState} from "./User-interfaces";

const initialState: IUserState = {
    users: [],
    user: null,
    teachers: [],
    teacher: null
};

const user = (state = initialState, action: UserActionTypes) => {

    switch (action.type) {

        case GET_USERS_BY_GROUP_SUCCEED:
            return {...state, users: action.payload}

        case IMPORT_STUDENTS_SUCCEED:
            return {...state, users: [...state.users, ...action.payload]}

        case GET_TEACHER_FOR_STUDENT_SUCCEED:
            return {...state, teacher: action.payload}

        case CREATE_USER_SUCCEED:
            return {...state, users: [...state.users, action.payload]}

        case GET_TEACHERS_SUCCEED:
            return {...state, teachers: action.payload}

        case GET_USER_BY_LOGIN_SUCCEED:
            return {...state, user: action.payload}

        case DELETE_USER_SUCCEED:
            return {...state, users: state.users.filter((user: IUserInterface) => user.login !== action.payload)}

        case GET_USER_BY_ID_SUCCEED:
            return {...state, user: action.payload}

        case EDIT_USER_SUCCEED:
            return {
                ...state, users: state.users.map((user: IUserInterface) => {
                    if (user.id === action.payload.id) {
                        return action.payload
                    }
                    return user
                }),
                user: action.payload.id === state.user?.id ? action.payload : state.user
            }

        default:
            return state
    }
}

export default user
