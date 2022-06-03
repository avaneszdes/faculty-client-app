import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools } from 'redux-devtools-extension';
import {rootSaga} from "../Saga/root";
import calendar from "./Calendar/Calendar-Reducer";
import alert from "./Alert/Alert-Reducer";
import user from "./User/User-Reducer";
import faculty from "./Faculty/Faculty-Reducer";
import auth from "./Auth/Auth-Reducer";
import document from "./Document/Document-Reducer";
import practice from "./Practice/Practice-Reducer";
import speciality from "./Specionality/Specionality-Reducer";
import {IAlertState} from "./Alert/Alert-interfaces";
import {ICalendarState} from "./Calendar/Calendar-interfaces";
import {IFacultyState} from "./Faculty/Faculty-interfaces";
import {IAuthInterface} from "./Auth/Auth-interfaces";
import {IUserState} from "./User/User-interfaces";
import {IDocumentState} from "./Document/Document-interfaces";
import {IPracticeState} from "./Practice/Practice-interfaces";
import {ISpecialityState} from "./Specionality/Specionality-interfaces";


export interface IRootState {
    alert: IAlertState
    auth: IAuthInterface
    faculty: IFacultyState
    calendar: ICalendarState
    user: IUserState
    document: IDocumentState
    practice: IPracticeState
    speciality: ISpecialityState
}

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const reducers = combineReducers({alert, auth, faculty, calendar, user, document, practice, speciality})
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(rootSaga)

    return store
}
