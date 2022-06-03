export const host = 'https://docker-heroku-demo-01.herokuapp.com/';

export default {
    authorize: host + 'login',
    getEvents: host + 'eventCalendar/getEventsByPracticeIds?practiceId=' ,
    deleteEvent: host +  'eventCalendar/deleteEvent',
    addEvent:  host +  "eventCalendar/addEvent",
    getPracticeByUserId: host +  "practice/getPracticeByUserId?userId=",
    addGroup: host +  "admin/addGroup",
    getCommentByUserId: host +  "admin/getComments?userId=",
    sendComment: host +  "admin/addComment?userId=",
    getUsersByGroup: host +  "admin/getUsersByGroup?code=",
    getUserById: host +  "admin/getUserById?userId=",
    updateEvent: host +  "eventCalendar/updateEvent",
    createUser: host +  "admin/addUser",
    deleteUser: host +  "admin/deleteUser",
    updateUser: host +  "admin/updateUser",
    importStudents: host +  "importStudents?groupCode=",
    getTeachers: host +  "admin/teachers",
    uploadFile: host +  "fileupload?practiceId=",
    deleteDocument: host +  "deleteFile/",
    getDocumentsByUserId: host +  "getFilesByUserId/",
    parseFile: host +  "parseFile/",
    getDocumentTypes: host +  "admin/doctypes",
    updateFileStatus: host +  "updateDocumentStatus",
    addDocumentType: host +  "admin/addDoctype",
    deleteDocumentType: host +  "admin/deleteDoctype",
    addPracticeLocation: host +  "admin/addLocation",
    updatePracticeLocation: host +  "admin/updateLocation",
    addPractice: host +  "practice/addPractice",
    deletePractice: host +  "practice/deletePractice",
    getAllPractices: host +  "practice/getPractices",
    getTeacherForStudent: host +  "admin/getTeacher?userId=",

    addSpeciality: host +  "admin/addSpec",
    deleteSpeciality: host +  "admin/deleteSpec",
    getAllSpecialities: host +  "admin/specs",
    getSpecialityById: host +  "admin/getSpec?specId=",
    updateSpeciality: host +  "admin/updateSpec",
}


export const documentStatuses = ['На рассмотрении', 'Принят', 'Отклонен' ]

export const roles = ['АДМИНИСТРАТОР', 'ЗАВКАФЕДРОЙ', 'ОРГАНИЗАТОР ПРАКТИКИ', 'РУКОВОДИТЕЛЬ ПРАКТИКИ']
export const practicePlaceStatuses = ['На рассмотрении', 'Принят', 'Отклонен']

// не предоставлен, на рассмотрении, утвержден
