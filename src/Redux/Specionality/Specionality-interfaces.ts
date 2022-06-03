export interface ISpecialityInterface {
    id: number
    name: string
}

export interface ISpecialityState {
    specialities: ISpecialityInterface[] | []
    speciality: ISpecialityInterface | null
}


