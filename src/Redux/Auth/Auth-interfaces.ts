export interface AuthenticationDto {
    login: string
    password: string
}

export interface IAuthInterface {
    token: string | null;
    role: string | null;
    login: string | null
    photo: string
    id: number
    exp: number | undefined
}
