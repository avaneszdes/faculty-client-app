import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import PracticeAccordion from "../StudentAccordions/PracticeAccordion";
import {CREATE_PRACTICE_LOCATION, UPDATE_PRACTICE_LOCATION,} from "../../Redux/Practice/Practice-constants";
import AboutPractice from "../StudentAccordions/AboutPractice";
import {IPracticeLocationInterface} from "../../Redux/Practice/Practice-interfaces";
import AlertComponent from "../Alerts/SuccessAlert";
import {practicePlaceStatuses} from "../../Constants/Constants";
import {convertDocStatus} from "../../Constants/Global";
import {GET_TEACHER_FOR_STUDENT} from "../../Redux/User/User-constants";
import {GET_COMMENTS_BY_USER_ID} from "../../Redux/Faculty/Faculty-constants";
import {GET_DOCUMENTS_BY_USER_ID} from "../../Redux/Document/Document-constants";
import Loader from "../Loading/Loader";


export default function StudentBasePage() {

    const practice = useSelector((root: IRootState) => root.practice)
    const user = useSelector((state: IRootState) => state.user.user)
    const loader = useSelector((x:IRootState) => x.alert.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.id !== undefined) {
            dispatch({type: GET_TEACHER_FOR_STUDENT, payload: user?.id})
            dispatch({type: GET_COMMENTS_BY_USER_ID, payload: user?.id})
            dispatch({type: GET_DOCUMENTS_BY_USER_ID, payload: user?.id})
        }
    }, [practice.practice, user?.id])

    const addPracticeLocation = (practicePlace: string) => {
        dispatch({
            type: CREATE_PRACTICE_LOCATION,
            payload: {location: practicePlace, status: convertDocStatus(practicePlaceStatuses[0]), userId: user?.id}
        })
    }

    const updatePracticeLocation = (practice: IPracticeLocationInterface) => {
        dispatch({type: UPDATE_PRACTICE_LOCATION, payload: practice})
    }

    return (
        <div style={{marginTop: '60px'}}>
            <AlertComponent/>
            <Loader hidden={loader} />
            <PracticeAccordion
                addPracticeLocation={addPracticeLocation}
                updatePracticeLocation={updatePracticeLocation}
            />
            <AboutPractice/>
        </div>
    );
}
