import {
    ADD_DOCUMENT_TYPE,
    ADD_DOCUMENT_TYPE_SUCCEED,
    DELETE_DOCUMENT_TYPE,
    DELETE_DOCUMENT_TYPE_SUCCEED,
    GET_DOCUMENT_TYPES,
    GET_DOCUMENT_TYPES_SUCCEED,
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

export interface GetDocumentTypes {
    type: typeof GET_DOCUMENT_TYPES,
    payload: number
}

export interface GetDocumentTypesSucceed {
    type: typeof GET_DOCUMENT_TYPES_SUCCEED,
    payload: string[]
}

export interface AddDocumentType {
    type: typeof ADD_DOCUMENT_TYPE,
    payload: string
}

export interface AddDocumentTypeSucceed {
    type: typeof ADD_DOCUMENT_TYPE_SUCCEED,
    payload: string
}

export interface DeleteDocumentType {
    type: typeof DELETE_DOCUMENT_TYPE,
    payload: number
}

export interface DeleteDocumentTypeSucceed {
    type: typeof DELETE_DOCUMENT_TYPE_SUCCEED,
    payload: number
}


export type DocumentActionTypes =
    UploadDocument
    | DeleteDocumentType
    | DeleteDocumentTypeSucceed
    | AddDocumentType
    | AddDocumentTypeSucceed
    | GetDocumentTypes
    | GetDocumentTypesSucceed
    | UploadDocumentSucceed
    | GetDocumentsByUserId
    | GetDocumentsByUserIdSucceed

