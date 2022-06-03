import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import UploadDocumentsAccordion from '../AdminAccordions/UploadDocumentsAccordion';
import AddGroupAccordion from "../AdminAccordions/AddGroupAccordion";
import ModifyStudentsAccordion from "../AdminAccordions/ModifyStudentAccordion";
import CreateUserAccordion from "../AdminAccordions/CreateUserAccordion";
import {CREATE_GROUP,} from "../../Redux/Faculty/Faculty-constants";
import {ICreateUserInterface, IUserInterface} from "../../Redux/User/User-interfaces";
import {CREATE_USER, DELETE_USER, EDIT_USER, GET_TEACHERS, GET_USERS_BY_GROUP} from "../../Redux/User/User-constants";
import DocumentTypeAccordion from '../AdminAccordions/DocumentTypeAccordion';
import {IDocumentType} from '../../Redux/Document/Document-interfaces';
import {ADD_DOCUMENT_TYPE, DELETE_DOCUMENT_TYPE} from '../../Redux/Document/Document-constants';
import AlertComponent from "../Alerts/SuccessAlert";
import AddPracticeAccordion from "../AdminAccordions/AddPracticeAccordion";
import {ADD_PRACTICE, DELETE_PRACTICE, GET_PRACTICES} from "../../Redux/Practice/Practice-constants";
import Loader from "../Loading/Loader";
import SpecialitiesAccordion from "../AdminAccordions/AddSpeciality";
import {ADD_SPECIALITY, DELETE_SPECIALITY} from "../../Redux/Specionality/Specionality-constants";
import ParseDocumentAccordion from "../AdminAccordions/ParseDocumentAccordion";


export default function AdminBasePage() {

    const dispatch = useDispatch()
    const docTypes = useSelector((rootState: IRootState) => rootState.document)
    const specialities = useSelector((rootState: IRootState) => rootState.speciality.specialities)
    const loader = useSelector((x: IRootState) => x.alert.loading)


    useEffect(() => {
        dispatch({type: GET_PRACTICES, payload: ''})
        dispatch({type: GET_TEACHERS, payload: ''})
    }, []);


    const modifyStudent = (student: IUserInterface) => {
        dispatch({type: EDIT_USER, payload: student})
    }

    const getStudentsByGroup = (group: string) => {
        if (group !== '') {
            dispatch({type: GET_USERS_BY_GROUP, payload: group})
        }
    }

    const addGroup = (group: string, specId: number) => {
        if (group !== '') {
            dispatch({type: CREATE_GROUP, payload: {groupCode: group, specId: specId}})
        }
    }

    const deleteStudentFromList = (login: string) => dispatch({type: DELETE_USER, payload: login})

    const createUser = (user: ICreateUserInterface) => {
        dispatch({type: CREATE_USER, payload: user})
    }

    const addDocumentType = (docType: IDocumentType) => {
        dispatch({type: ADD_DOCUMENT_TYPE, payload: docType})
    }

    const deleteDocumentType = (id: number) => {
        dispatch({type: DELETE_DOCUMENT_TYPE, payload: id})
    }

    const createPractice = (name: string) => {
        dispatch({type: ADD_PRACTICE, payload: name})
    }

    const deletePractice = (id: number) => {
        dispatch({type: DELETE_PRACTICE, payload: id})
    }

    const addSpeciality = (name: string) => {
        dispatch({type: ADD_SPECIALITY, payload: name})
    }

    const deleteSpeciality = (id: number) => {
        dispatch({type: DELETE_SPECIALITY, payload: id})
    }

    return (
        <div style={{marginTop: '60px'}}>
            <AlertComponent/>
            <Loader hidden={loader}/>
            <AddPracticeAccordion addPractice={createPractice} deletePractice={deletePractice}/>
            <CreateUserAccordion createUser={createUser}/>
            <AddGroupAccordion specialities={specialities} addGroup={addGroup}/>
            <ModifyStudentsAccordion
                modifyStudent={modifyStudent}
                getStudentsByGroup={getStudentsByGroup}
                addStudentToList={createUser}
                deleteStudentFromList={deleteStudentFromList}
            />
            <DocumentTypeAccordion
                documentTypes={docTypes.documentTypes}
                addDocumentType={addDocumentType}
                deleteDocumentType={deleteDocumentType}
            />
            <UploadDocumentsAccordion/>
            <SpecialitiesAccordion
                specialities={specialities}
                addSpeciality={addSpeciality}
                deleteSpeciality={deleteSpeciality}
            />
            <ParseDocumentAccordion/>
        </div>
    );
}
