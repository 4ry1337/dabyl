import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {Disclosure, Transition} from "@headlessui/react";
import {format} from "date-fns";
import {HiOutlineEye, HiOutlineVolumeUp} from "react-icons/hi";
import {classNames, IHistory} from "Shared";

type ReportProp = {
    className?: string
    item: IHistory
}

export const HistoryItem: FC<ReportProp> = ({item}) => {
    return (
        <Disclosure>
            <Disclosure.Button>
                <div className={`grid grid-cols-4 gap-4 text-center px-4 py-2.5 shadow-md items-center bg-white rounded-lg border border-gray-200 ui-open:bg-secondary hover:bg-gray-100 ui-open:hover:bg-secondary`}>
                    <div>{format(new Date(item.createdAt), 'dd.MM.yyyy / HH:mm')}</div>
                    <div className={'overflow-hidden'}>{item.commandName}</div>
                    <div className={'overflow-hidden'}>Список {item.historyNumber}</div>
                    <div className={'flex flex-row space-x-4 item-center justify-center'}>
                        <HiOutlineVolumeUp className={classNames('h-7 w-7', (item.notificationMethod.toString() === '3' || item.notificationMethod.toString() === '1') ? 'text-gray-900' : 'text-transparent')}/>
                        <HiOutlineEye className={classNames('h-7 w-7', (item.notificationMethod.toString() === '3' || item.notificationMethod.toString() === '2') ? 'text-gray-900' : 'text-transparent')}/>
                    </div>
                </div>
            </Disclosure.Button>
            <Transition
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Disclosure.Panel>
                    <div className={'grid grid-cols-4 gap-4 text-center'}>
                        <div className={'col-span-3 grid gap-y-2 py-2.5 shadow-md bg-white rounded-lg border border-gray-200'}>
                            <div className={'grid grid-cols-3 text-sm items-center px-4'}>
                                <h1>Всего в списке:</h1>
                                <h1>Доставлено:</h1>
                                <h1>Не доставлено:</h1>
                            </div>
                            <div className={'grid grid-cols-3 items-center px-4 bg-gray-100'}>
                                <div>{item.statisctics.totalSMS} </div>
                                <div>{item.statisctics.successfulSMS} ({(item.statisctics.successfulSMS / item.statisctics.totalSMS * 100).toFixed(1)}%)</div>
                                <div>{item.statisctics.unSuccessfu11SMS} ({(item.statisctics.successfulSMS / item.statisctics.totalSMS * 100).toFixed(1)}%)</div>
                            </div>
                        </div>
                        <div className={'grid place-items-center gap-y-2'}>
                            <NavLink
                                to={`/history/${item.id}`}
                                className={'bg-green hover:bg-darkGreen rounded-md w-full h-full flex justify-center items-center'}
                            >
                                <h1 className={'text-white'}>
                                    Отчет
                                </h1>
                            </NavLink>
                        </div>
                    </div>
                </Disclosure.Panel>
            </Transition>
        </Disclosure>
    );
};