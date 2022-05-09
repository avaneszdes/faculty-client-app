export interface IDocument {
    id: number
    document: FormData
    documentType: IDocumentType
}

export interface IDocumentType {
    id: number
    documentType: string
}

export interface IDocumentState {
    documents: IDocument[] | []
    document: FormData | null
    documentTypes: IDocumentType[] | []
}
