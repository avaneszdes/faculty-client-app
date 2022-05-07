export interface IDocument {
    id: number
    document: FormData
}


export interface IDocumentState {
    documents: IDocument[] | []
    document: FormData | null
}
