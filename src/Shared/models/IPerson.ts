export interface IPerson {
        id: string,
        historyId: string,
        smsId: string
        status: number,
        smsStatusCode: number,
        callStatusCode: number,
        firstName: string,
        lastName: string,
        middleName: string,
        email: string,
        telephone: string,
        rank: string,
        isactive: boolean,
        date: string
}

export interface IPersonMinified {
        "ФИО": string,
        "телефон": string,
        "статус смс"?: string,
        "дата отправки смс"?: string,
        "дата доставки смс"?: string,
        "статус звонка"?: string,
        "дата отправки звонка"?: string,
        "дата доставки звонка"?: string,
}