export interface IPracticeInterface {
    id: number
    name: string
}

export interface INewPracticeInterface {
    name: string
    start: string
    end: string
}

export interface IPracticeLocationInterface {
    location: string
    status: string
    userId: number
    id: number
}

export interface IPracticeState {
    practices: IPracticeInterface[] | []
    practice: IPracticeInterface | INewPracticeInterface | null
    practiceLocation: IPracticeLocationInterface | string | null
}


