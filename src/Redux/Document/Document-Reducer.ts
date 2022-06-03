import {IDocumentState, IDocumentType} from "./Document-interfaces";
import {DocumentActionTypes} from "./Document-action";
import {
    ADD_DOCUMENT_TYPE_SUCCEED,
    DELETE_DOCUMENT_BY_ID_SUCCEED,
    DELETE_DOCUMENT_TYPE_SUCCEED,
    GET_DOCUMENT_TYPES_SUCCEED,
    GET_DOCUMENTS_BY_USER_ID_SUCCEED,
    PARSE_FILE_SUCCEED,
    UPLOAD_DOCUMENT_SUCCEED
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

        case PARSE_FILE_SUCCEED:
            return {...state, documents: action.payload}

        case DELETE_DOCUMENT_BY_ID_SUCCEED:
            return {...state, documents: state.documents.filter(x => x.id !== action.payload)}

        case UPLOAD_DOCUMENT_SUCCEED:
            return {...state, documents: [...state.documents, action.payload]}

        case GET_DOCUMENT_TYPES_SUCCEED:
            return {
                ...state,
                documentTypes: action.payload
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
