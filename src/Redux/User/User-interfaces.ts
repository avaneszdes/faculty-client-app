export interface IUserInterface {
    id: number
    name: string
    surname: string
    middleName: string
    login: string
    password: string
    mail?: string
    role: string
    practiceId?: number | string
    groupCode: string
    teacherId: number
    mark: number
    dolj: string | null
}

export interface ICreateUserInterface {
    name: string
    surname: string
    middleName?: string
    role: string
    password: string
    login: string
    groupCode: string
    dolj: string | null
    teacherId: number | null
    practiceId?: number | string | null
}

export interface ICsvFileUpload {
    file: FormData
    groupCode: number
    practiceId: number
}

export interface IUserState {
    users: IUserInterface[] | []
    user: IUserInterface | null
    teachers: IUserInterface[] | []
    teacher: IUserInterface | null
}
