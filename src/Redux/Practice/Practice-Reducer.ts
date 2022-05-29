import {IPracticeState} from "./Practice-interfaces";
import {PracticeActionTypes} from "./Practice-action";
import {
    ADD_PRACTICE_SUCCEED,
    CREATE_PRACTICE_LOCATION_SUCCEED,
    DELETE_PRACTICE_SUCCEED,
    GET_PRACTICE_BY_USER_ID_SUCCEED,
    GET_PRACTICES_SUCCEED,
    UPDATE_PRACTICE_LOCATION_SUCCEED,
    UPDATE_PRACTICE_SUCCEED
} from "./Practice-constants";


const initialState: IPracticeState = {
    practices: [],
    practice: null,
    practiceLocation: null
}

const practice = (state = initialState, action: PracticeActionTypes) => {

    switch (action.type) {

        case ADD_PRACTICE_SUCCEED:
            return {...state, practices: [...state.practices, action.payload]}

        case DELETE_PRACTICE_SUCCEED:
            return {...state, practices: state.practices.filter(x => x.id !== action.payload)}

        case GET_PRACTICE_BY_USER_ID_SUCCEED:
            return {...state, practice: action.payload}

        case CREATE_PRACTICE_LOCATION_SUCCEED:
            return {...state, practiceLocation: action.payload}

        case UPDATE_PRACTICE_LOCATION_SUCCEED:
            return {...state, practiceLocation: action.payload}

        case UPDATE_PRACTICE_SUCCEED:
            return {
                ...state, practices: state.practices.map((x) => {
                    if (x.id === action.payload.id) {
                        return action.payload
                    }
                    return x
                })
            }

        // case UPDATE_PRACTICE_SUCCEED:
        //     return {...state, practice: action.payload}

        case GET_PRACTICES_SUCCEED:
            return {...state, practices: action.payload}

        default:
            return state
    }
}

export default practice
