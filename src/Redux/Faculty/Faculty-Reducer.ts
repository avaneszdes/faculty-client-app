import {IFacultyState} from "./Faculty-interfaces";
import {FacultyActionTypes} from "./Faculty-actions";
import {
    ADD_STUDENT_TO_LIST_SUCCEED, CREATE_GROUP_SUCCEED,
    DELETE_STUDENT_FROM_LIST_SUCCEED, EDIT_STUDENT_SUCCEED,
    GET_USERS_BY_GROUP_SUCCEED
} from "./Faculty-constants";

const students = [
    {
        id: 1,
        name: '?????',
        surname: '?????????',
        middleName: '?',
        username: 'student',
        password: 'student',
        practiceId: 1,
        groupId: 1
    },
    {
        id: 2,
        name: '????',
        surname: '????????',
        middleName: '???????',
        username: 'student2',
        password: 'student2',
        practiceId: 2,
        groupId: 2
    },
    {
        id: 3,
        name: '???????',
        surname: '??????',
        middleName: '??????',
        username: 'student3',
        password: 'student3',
        practiceId: 1,
        groupId: 1
    },
]

const initialState: IFacultyState = {
    students: [],
    group: null,
    loading: true
}


const faculty = (state = initialState, action: FacultyActionTypes) => {

    switch (action.type) {

        case GET_USERS_BY_GROUP_SUCCEED:
            return {...state, students: [...state.students, ...students]}

        case DELETE_STUDENT_FROM_LIST_SUCCEED:
            return {...state, students: state.students?.filter(x => x.id != action.payload)}

        case ADD_STUDENT_TO_LIST_SUCCEED:
            return {...state, students: [...state.students, action.payload]}

        case EDIT_STUDENT_SUCCEED:
            return {
                ...state, students: state.students.map(x => {
                    if (x.id === action.payload.id) {
                        return action.payload
                    }

                    return x
                })
            }

        case CREATE_GROUP_SUCCEED:
            return {...state, group: action.payload}

        default:
            return state
    }
}

export default faculty
