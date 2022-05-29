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

export const convertDocStatus = (status: string): string => {

    switch (status) {
        case 'На рассмотрении':
            return 'WAITING'
        case 'Принят':
            return 'APPROVED'
        case 'Отклонен':
            return 'REJECTED'
    }

    return ''
}


export const convertRole = (role: string): string => {

    switch (role) {
        case 'АДМИНИСТРАТОР':
            return 'ADMINISTRATOR'
        case 'СТУДЕНТ':
            return 'STUDENT'
        case 'ЗАВКАФЕДРОЙ':
            return 'STUDENT'
        case 'ОРГАНИЗАТОР ПРАКТИКИ':
            return 'PRACTICE_ORGANIZER'
        case 'РУКОВОДИТЕЛЬ ПРАКТИКИ':
            return 'PRACTICE_LEADER'
    }

    return ''
}
