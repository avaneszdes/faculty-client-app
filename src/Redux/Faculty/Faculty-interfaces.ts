export interface IStudent {
    id: number
    name: string
    surname: string
    middleName: string
    username: string
    password: string
    practiceId: number
    groupId: number
}


export interface IFacultyState {
    students: IStudent[] | []
    group: IGroup | null
    loading: boolean
}

export interface IGroup {
    id: number,
    code: number
}
