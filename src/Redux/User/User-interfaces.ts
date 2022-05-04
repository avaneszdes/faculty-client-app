export interface IUserInterface {
    id: number
    name: string
    surname: string
    middleName?: string
    login: string
    mail?: string
    role: string
    practiceId: number
    groupId: number
}

export interface ICreateUserInterface {
    name: string
    surname: string
    middleName?: string
    role: string
    login: string
}

export interface IUserState {
    users: IUserInterface[] | []
    user: IUserInterface | null
}
