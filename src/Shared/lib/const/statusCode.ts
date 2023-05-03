export interface SMSStatus {
    message: string,
    color: string,
}

export const StatusCode = (code: number): SMSStatus => {
    switch (code) {
        case -3:
            return {color: 'warning', message: 'Сообщение не найдено'}
        case -2:
            return {color: 'warning', message: 'Остановлено'}
        case -1:
            return {color: 'warning', message: 'Ожидает отправки'}
        case 0:
            return {color: 'info', message: 'Передано оператору'}
        case 1:
            return {color: 'success', message: 'Доставлено'}
        case 2:
            return {color: 'success', message: 'Прочитано'}
        case 3:
            return {color: 'success', message: 'Просрочено'}
        case 4:
            return {color: 'success', message: 'Нажата ссылка'}
        case 20:
            return {color: 'danger', message: 'Невозможно доставить'}
        case 22:
            return {color: 'danger', message: 'Неверный номер'}
        case 23:
            return {color: 'danger', message: 'Запрещено'}
        case 24:
            return {color: 'danger', message: 'Недостаточно средств'}
        case 25:
            return {color: 'danger', message: 'Недоступный номер'}
        default:
            return {color: '', message: 'No Status'}
    }
}
