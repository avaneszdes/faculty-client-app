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
        name: 'Vlad',
        surname: 'Avanesov',
        middleName: 'Borisovich',
        username: 'student',
        password: 'student',
        practiceId: 1,
        groupId: 1
    },
    {
        id: 2,
        name: 'Vlad2',
        surname: 'Avanesov2',
        middleName: 'Borisovich2',
        username: 'student2',
        password: 'student2',
        practiceId: 2,
        groupId: 2
    },
    {
        id: 3,
        name: 'Vlad3',
        surname: 'Avanesov3',
        middleName: 'Borisovich3',
        username: 'student3',
        password: 'student3',
        practiceId: 1,
        groupId: 1
    },
    {
        id: 4,
        name: 'Vlad4',
        surname: 'Avanesov4',
        middleName: 'Borisovich4',
        username: 'student4',
        password: 'student4',
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
