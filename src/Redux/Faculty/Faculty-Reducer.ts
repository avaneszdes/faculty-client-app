import {IFacultyState} from "./Faculty-interfaces";
import {FacultyActionTypes} from "./Faculty-actions";
import {CREATE_GROUP_SUCCEED, GET_COMMENTS_BY_USER_ID_SUCCEED, SEND_COMMENT_SUCCEED,} from "./Faculty-constants";

const initialState: IFacultyState = {
    group: null,
    loading: true,
    comments: []
}

const faculty = (state = initialState, action: FacultyActionTypes) => {

    switch (action.type) {

        case CREATE_GROUP_SUCCEED:
            return {...state, group: action.payload}

        case GET_COMMENTS_BY_USER_ID_SUCCEED:
            return {...state, comments: action.payload}

        case SEND_COMMENT_SUCCEED:
            return {...state, comments: [...state.comments, action.payload]}

        default:
            return state
    }
}

export default faculty
