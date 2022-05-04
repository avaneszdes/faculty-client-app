export const getFullDate = (date: Date, locale: string) => {
    return new Date(Date.parse(date.toString())).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const lng = () => localStorage.getItem("i18nextLng")

export const regexes = {
    phoneRegExp: '^[0-9+]{10,15}$',
    password: '^[0-9+]{5,10}$',
    login: '^[0-9+]{10,15}$',
}

export function getErrorInformation(error: any){

    if (error?.response?.data?.status === undefined ){
        return null
    }

    return error?.response?.data?.status + ' ' + error?.response?.data?.status?.error + '\t' + error?.response?.data?.status?.timestamp
}
