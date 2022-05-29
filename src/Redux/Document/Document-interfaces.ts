export interface IDocument {
    id: number,
    filename: string,
    userId: number,
    status: string,
    practiceId: number
}

export interface IDocumentUpload {
    userId: number
    file: FormData
    docTypeId: number
    practiceId: number
}

export interface IDocumentType {
    id: number
    type: string
}

export interface IDocumentState {
    documents: IDocument[] | []
    document: IDocumentUpload | IDocument | null
    documentTypes: IDocumentType[] | []
}
