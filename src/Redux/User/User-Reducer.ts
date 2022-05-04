import {CREATE_USER_SUCCEED, DELETE_USER_SUCCEED, EDIT_USER_SUCCEED, GET_USER_BY_LOGIN_SUCCEED} from "./User-constants";
import {UserActionTypes} from "./User-action";
import {IUserInterface, IUserState} from "./User-interfaces";

const initialState: IUserState = {
    users: [],
    user: null
};

const user = (state = initialState, action: UserActionTypes) => {

    switch (action.type) {

        case CREATE_USER_SUCCEED:
            return {...state, users: action.payload}

        case GET_USER_BY_LOGIN_SUCCEED:
            return {...state, user: action.payload}

        case DELETE_USER_SUCCEED:
            return {...state, users: state.users.filter((user: IUserInterface) => user.id !== action.payload)}

        case EDIT_USER_SUCCEED:
            return {
                ...state, users: state.users.map((user: IUserInterface) => {
                    if (user.id === action.payload.id) {
                        return action.payload
                    }
                    return user
                })
            }

        default:
            return state
    }
}

export default user
