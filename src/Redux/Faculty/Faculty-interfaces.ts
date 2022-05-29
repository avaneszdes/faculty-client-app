export interface IFacultyState {
    group: IGroup | null
    loading: boolean
    comments: ICommentInterface[] | []
}

export interface ICommentInterface{
    id: number
    comment: string
    receiverId: number
}
export interface IGroup {
    id: number,
    code: number
}
