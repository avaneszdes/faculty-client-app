import {SpecialityActionTypes} from "./Specionality-action";
import {ISpecialityState} from "./Specionality-interfaces";
import {
    ADD_SPECIALITY_SUCCEED,
    DELETE_SPECIALITY_SUCCEED,
    GET_SPECIALITIES, GET_SPECIALITIES_SUCCEED,
    GET_SPECIALITY_SUCCEED,
    UPDATE_SPECIALITY_SUCCEED
} from "./Specionality-constants";


const initialState: ISpecialityState = {
    specialities: [],
    speciality: null
}

const speciality = (state = initialState, action: SpecialityActionTypes) => {

    switch (action.type) {

        case ADD_SPECIALITY_SUCCEED:
            return {...state, specialities: [...state.specialities, action.payload]}

        case DELETE_SPECIALITY_SUCCEED:
            return {...state, specialities: state.specialities.filter(x => x.id !== action.payload)}

        case GET_SPECIALITY_SUCCEED:
            return {...state, speciality: action.payload}

        case UPDATE_SPECIALITY_SUCCEED:
            return {
                ...state, specialities: state.specialities.map((x) => {
                    if (x.id === action.payload.id) {
                        return action.payload
                    }
                    return x
                })
            }

        case GET_SPECIALITIES_SUCCEED:
            return {...state, specialities: action.payload}

        default:
            return state
    }
}

export default speciality
