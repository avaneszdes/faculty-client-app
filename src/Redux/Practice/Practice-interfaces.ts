export interface IPracticeInterface {
    id: number
    name: string
}

export interface INewPracticeInterface {
    name: string
}

export interface IPracticeLocationInterface {
    location: string
    status: string
    id: number
}

export interface IPracticeState {
    practices: IPracticeInterface[] | []
    practice: IPracticeInterface | INewPracticeInterface | null
    practiceLocation: IPracticeLocationInterface | string | null
}


