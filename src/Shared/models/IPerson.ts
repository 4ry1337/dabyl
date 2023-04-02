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
        ФИО: string,
        статус: string,
        телефон: string,
        ранг: string,
        дата: string
}