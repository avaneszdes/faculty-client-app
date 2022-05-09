import {IDocumentState, IDocumentType} from "./Document-interfaces";
import {DocumentActionTypes} from "./Document-action";
import {
    GET_DOCUMENT_TYPES_SUCCEED,
    GET_DOCUMENTS_BY_USER_ID_SUCCEED,
    UPLOAD_DOCUMENT_SUCCEED,
    ADD_DOCUMENT_TYPE_SUCCEED,
    DELETE_DOCUMENT_TYPE_SUCCEED
} from "./Document-constants";

const initialState: IDocumentState = {
    document: null,
    documents: [],
    documentTypes: []
}

const document = (state = initialState, action: DocumentActionTypes) => {

    switch (action.type) {

        case GET_DOCUMENTS_BY_USER_ID_SUCCEED:
            return {...state, documents: action.payload}

        case UPLOAD_DOCUMENT_SUCCEED:
            return {...state, document: action.payload}

        case GET_DOCUMENT_TYPES_SUCCEED:
            return {
                ...state,
                documentTypes: [{id: 1, documentType: 'Отчет практики'}, {id: 2, documentType: 'Дневник Практики'}]
            }

        case ADD_DOCUMENT_TYPE_SUCCEED:
            return {...state, documentTypes: [...state.documentTypes, action.payload]}

        case DELETE_DOCUMENT_TYPE_SUCCEED:
            return {...state, documentTypes: state.documentTypes.filter((x: IDocumentType) => x.id !== action.payload)}

        default:
            return state
    }
}

export default document
