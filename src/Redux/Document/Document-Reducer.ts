import {IDocumentState} from "./Document-interfaces";
import {DocumentActionTypes} from "./Document-action";
import {GET_DOCUMENTS_BY_USER_ID_SUCCEED, UPLOAD_DOCUMENT_SUCCEED} from "./Document-constants";

const initialState: IDocumentState = {
    document: null,
    documents: []
}

const document = (state = initialState, action: DocumentActionTypes) => {

    switch (action.type) {

        case GET_DOCUMENTS_BY_USER_ID_SUCCEED:
            return {...state, documents: action.payload}

        case UPLOAD_DOCUMENT_SUCCEED:
            return {...state, document: action.payload}

        default:
            return state
    }
}

export default document
