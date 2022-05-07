
import {
    GET_DOCUMENTS_BY_USER_ID,
    GET_DOCUMENTS_BY_USER_ID_SUCCEED,
    UPLOAD_DOCUMENT,
    UPLOAD_DOCUMENT_SUCCEED
} from "./Document-constants";
import {IDocument} from "./Document-interfaces";


export interface UploadDocument {
    type: typeof UPLOAD_DOCUMENT,
    payload: FormData
}

export interface UploadDocumentSucceed {
    type: typeof UPLOAD_DOCUMENT_SUCCEED,
    payload: IDocument
}

export interface GetDocumentsByUserId {
    type: typeof GET_DOCUMENTS_BY_USER_ID,
    payload: number
}

export interface GetDocumentsByUserIdSucceed {
    type: typeof GET_DOCUMENTS_BY_USER_ID_SUCCEED,
    payload: IDocument
}


export type DocumentActionTypes =
    UploadDocument
    | UploadDocumentSucceed
    | GetDocumentsByUserId
    | GetDocumentsByUserIdSucceed

