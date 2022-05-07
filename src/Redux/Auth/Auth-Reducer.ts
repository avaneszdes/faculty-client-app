import {AUTHORIZATION_SUCCEED, LOG_OUT, } from "./Auth-constants";
import {AuthActionTypes} from "./Auth-action";
import {IAuthInterface} from "./Auth-interfaces";


const initialState: IAuthInterface = {role: null, id: 0};

const auth = (state = initialState, action: AuthActionTypes) => {

    switch (action.type) {

        case AUTHORIZATION_SUCCEED:
            return {
                role: action.payload.role,
                id: action.payload.id
            }

        case LOG_OUT:
            return {role: null, id: 0}

        default:
            return state
    }
}

export default auth
