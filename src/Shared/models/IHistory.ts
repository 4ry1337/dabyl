import {notificationMethod} from "../lib";

export interface IHistory {
    id: string,
    createdAt: string,
    userId: string,
    commandId: string,
    commandName: string,
    isActive: boolean,
    historyNumber: number
    userLogin: string,
    userEmail: string
    notificationMethod: notificationMethod,
    notificationTime: string,
    statisctics:{
        totalrecords: number,
        totalCalls: number,
        successfulCalls: number,
        unSuccessfuICalls: number,
        totalSMS: number,
        successfulSMS: number
        unSuccessfu11SMS: number,
    }
}

