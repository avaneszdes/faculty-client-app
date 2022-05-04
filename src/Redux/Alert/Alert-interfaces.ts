export interface AlertInterface {
    message: string
    type: boolean
}

export interface IAlertState {
    alert: AlertInterface
    loading: boolean
}
