import {all} from 'redux-saga/effects'
import {logOutWorkerWatcher} from "./Auth/Logout";
import {getEventsWatcher} from "./Calendar/GetEvents";
import {addGroupWatcher} from "./Faculty/AddGroup";
import {getUserByIdWatcher} from "./User/GetUserById";
import {updateEventWatcher} from "./Calendar/UpdateEvent";
import {createEventWatcher} from "./Calendar/AddEvent";
import {deleteEventsWatcher} from "./Calendar/DeleteEvent";
import {addUserWatcher} from "./User/AddUser";
import {uploadDocumentWatcher} from "./Document/UoloadDocument";
import {getDocumentTypesWatcher} from "./Document/GetDocumentTypes";
import {addDocumentTypeWatcher} from "./Document/AddDocumentType";
import {deleteDocumentTypeWatcher} from "./Document/DeleteDocumentType";
import {getPracticeByUserIdWatcher} from "./Practice/GetPracticeByUserId";
import {addPracticeLocationWatcher} from "./Practice/AddPracticeLocation";
import {addPracticeWatcher} from "./Practice/AddPractice";
import {updatePracticeLocationWatcher} from "./Practice/UpdatePracticeLocation";
import {getAllPracticesWatcher} from "./Practice/GetAllPractices";
import {deletePracticeWatcher} from "./Practice/DeletePractice";
import {getTeachersWatcher} from "./User/GetTeachers";
import {getStudentsByGroupWatcher} from "./User/GetUsersByGroup";
import {deleteUserWatcher} from "./User/DeleteUser";
import {updateUserWatcher} from "./User/UpdateUser";
import {getDocumentsByUserIdWatcher} from "./Document/GetDocumentsByUserId";
import {getTeacherForStudentWatcher} from "./User/GetTeacherForStudent";
import {getCommentsByUserIdWatcher} from "./Faculty/GetCommentsByUserId";
import {sendCommentWatcher} from "./Faculty/SendComment";
import {deleteDocumentByIdWatcher} from "./Document/DeleteDocumentById";
import {updateFileStatusByIdWatcher} from "./Document/UpdateFileStatus";
import {importStudentsWatcher} from "./User/ImportStudentsFromFile";
import {updateSpecialityWatcher} from "./Speciality/UpdateSpeciality";
import {getSpecialityByIdWatcher} from "./Speciality/GetSpecialityById";
import {getAllSpecialitiesWatcher} from "./Speciality/GetAllSpecialities";
import {deleteSpecialityWatcher} from "./Speciality/DeleteSpeciality";
import {addSpecialityWatcher} from "./Speciality/AddSpeciality";

export function* rootSaga() {
    yield all([
        logOutWorkerWatcher(),
        getEventsWatcher(),
        getPracticeByUserIdWatcher(),
        addGroupWatcher(),
        getUserByIdWatcher(),
        getStudentsByGroupWatcher(),
        updateEventWatcher(),
        createEventWatcher(),
        deleteEventsWatcher(),
        addUserWatcher(),
        uploadDocumentWatcher(),
        addDocumentTypeWatcher(),
        deleteDocumentTypeWatcher(),
        addPracticeLocationWatcher(),
        addPracticeWatcher(),
        updatePracticeLocationWatcher(),
        getAllPracticesWatcher(),
        getTeachersWatcher(),
        deletePracticeWatcher(),
        deleteUserWatcher(),
        updateUserWatcher(),
        getDocumentsByUserIdWatcher(),
        getTeacherForStudentWatcher(),
        getCommentsByUserIdWatcher(),
        sendCommentWatcher(),
        deleteDocumentByIdWatcher(),
        updateFileStatusByIdWatcher(),
        importStudentsWatcher(),
        updateSpecialityWatcher(),
        getSpecialityByIdWatcher(),
        getAllSpecialitiesWatcher(),
        deleteSpecialityWatcher(),
        addSpecialityWatcher(),
        getDocumentTypesWatcher()
    ]);
}
