export interface AuthenticationDto {
    login: string
    password: string
}

export interface IAuthInterface {
    role: string | null;
    id: number
}
