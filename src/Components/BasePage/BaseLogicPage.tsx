import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import UploadDocumentsAccordion from '../Accordions/UploadDocumentsAccordion';
import AddGroupAccordion from "../Accordions/AddGroupAccordion";
import ModifyStudentsAccordion from "../Accordions/ModifyStudentAccordion";
import CreateUserAccordion from "../Accordions/CreateUserAccordion";
import {IStudent} from "../../Redux/Faculty/Faculty-interfaces";
import {
    ADD_STUDENT_TO_LIST_SUCCEED, CREATE_GROUP_SUCCEED, DELETE_STUDENT_FROM_LIST_SUCCEED,
    EDIT_STUDENT_SUCCEED,
    GET_USERS_BY_GROUP_SUCCEED
} from "../../Redux/Faculty/Faculty-constants";
import {ICreateUserInterface} from "../../Redux/User/User-interfaces";
import {CREATE_USER_SUCCEED} from "../../Redux/User/User-constants";


export default function BaseLogicPage() {

    const dispatch = useDispatch()
    const facultyState = useSelector((rootState: IRootState) => rootState.faculty)

    const addStudentToList = (student: IStudent) => {
        dispatch({
            type: ADD_STUDENT_TO_LIST_SUCCEED,
            payload: {...student, id: Math.floor(Math.random() * 1000) + 1, groupId: facultyState.group?.id}
        })
    }

    const modifyStudent = (student: IStudent) => {
        dispatch({type: EDIT_STUDENT_SUCCEED, payload: student})
    }

    const getStudentsByGroup = (group: string) => {
        if (group !== '') {
            dispatch({type: GET_USERS_BY_GROUP_SUCCEED, payload: group})
        }
    }

    const addGroup = (group: string) => {
        if (group !== '') {
            dispatch({
                type: CREATE_GROUP_SUCCEED,
                payload: {id: Math.floor(Math.random() * 1000) + 1, code: group}
            })
        }
    }

    const deleteStudentFromList = (id: number) => dispatch({type: DELETE_STUDENT_FROM_LIST_SUCCEED, payload: id})

    const createUser = (user: ICreateUserInterface) => {
        dispatch({type: CREATE_USER_SUCCEED, payload: user})
    }

    return (
        <div style={{marginTop: '60px'}}>
            <UploadDocumentsAccordion/>
            <AddGroupAccordion
                addGroup={addGroup}
                addStudentToList={addStudentToList}
                currentGroup={facultyState.group}
            />
            <ModifyStudentsAccordion
                modifyStudent={modifyStudent}
                getStudentsByGroup={getStudentsByGroup}
                addStudentToList={addStudentToList}
                deleteStudentFromList={deleteStudentFromList}
                students={facultyState.students}
            />
            <CreateUserAccordion createUser={createUser}/>
        </div>
    );
}
