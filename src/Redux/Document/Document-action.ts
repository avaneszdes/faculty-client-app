import {
    ADD_DOCUMENT_TYPE,
    ADD_DOCUMENT_TYPE_SUCCEED, DELETE_DOCUMENT_BY_ID, DELETE_DOCUMENT_BY_ID_SUCCEED,
    DELETE_DOCUMENT_TYPE,
    DELETE_DOCUMENT_TYPE_SUCCEED,
    GET_DOCUMENT_TYPES,
    GET_DOCUMENT_TYPES_SUCCEED,
    GET_DOCUMENTS_BY_USER_ID,
    GET_DOCUMENTS_BY_USER_ID_SUCCEED, UPDATE_FILE_STATUS_BY_ID,
    UPLOAD_DOCUMENT,
    UPLOAD_DOCUMENT_SUCCEED
} from "./Document-constants";
import {IDocument, IDocumentUpload} from "./Document-interfaces";


export interface UploadDocument {
    type: typeof UPLOAD_DOCUMENT,
    payload: IDocumentUpload
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
    payload: IDocument[]
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

export interface DeleteDocumentById {
    type: typeof DELETE_DOCUMENT_BY_ID,
    payload: number
}

export interface DeleteDocumentByIdSucceed {
    type: typeof DELETE_DOCUMENT_BY_ID_SUCCEED,
    payload: number
}

export interface UpdateFileStatusById {
    type: typeof UPDATE_FILE_STATUS_BY_ID,
    payload: {id: number, status: string}
}

export type DocumentActionTypes =
    UploadDocument
    | DeleteDocumentById
    | DeleteDocumentByIdSucceed
    | DeleteDocumentType
    | DeleteDocumentTypeSucceed
    | AddDocumentType
    | AddDocumentTypeSucceed
    | GetDocumentTypes
    | GetDocumentTypesSucceed
    | UploadDocumentSucceed
    | GetDocumentsByUserId
    | GetDocumentsByUserIdSucceed
    | UpdateFileStatusById

