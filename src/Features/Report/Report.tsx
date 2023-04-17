import React, {useEffect, useRef, useState} from 'react';
import {
    HiOutlinePrinter,
    HiOutlineVolumeUp,
    HiOutlineXCircle,
    HiRefresh,
} from "react-icons/hi";
import {RadioGroup} from '@headlessui/react'
import {historyAPI} from "Entities/History";
import {classNames, getFullName, Loading, notificationMethod, smsStatusCode} from "../../Shared";
import {format} from "date-fns";
import {NavLink} from "react-router-dom";
import { GenerateExcelButtons } from './GenerateExcelButtons';
import ReactToPrint from 'react-to-print';

type ReportProps = {
    id: string,
}

export const Report = ({id}: ReportProps) => {
    const printRef = useRef(null);
    const [trigger, result] = historyAPI.useLazyFetchHistoryByIDQuery()
    useEffect(()=>{
        trigger({
            id: id
        })
    }, [id, trigger])

    const [status, setStatus] = useState(0);

    const [query, setQuery] = useState('')

    /*const [selectedRanks, setSelectedRanks] = useState<string[]>([])
    const filteredRanks = query === '' ? militaryRanks : militaryRanks.filter((rank) => {return rank.toLowerCase().includes(query.toLowerCase())})

    function handleSelect(value: string[]) {
        setSelectedRanks(value);
    }*/
    function clickHandler(){
        console.log(query)
    }
    return (
        <div className={'grow flex flex-col'}>
            {result.isLoading && <Loading/>}
            {result.isSuccess && result.data &&
                <>
                    <div className={'bg-primary'}>
                        <div
                            className={'container py-2.5 mx-auto grow flex flex-row items-center justify-between text-white'}>
                            <div className={'flex flex-row items-center space-x-2'}>
                                <button onClick={()=>trigger({id: id})}>
                                    <HiRefresh className={'h-6 w-6'}/>
                                </button>
                                <GenerateExcelButtons data={result.data}/>
                                <ReactToPrint
                                    trigger={() => <button><HiOutlinePrinter className={'h-6 w-6'}/></button>}
                                    content={() => printRef.current}
                                    documentTitle={`Отчет за ${format(new Date(result.data.history.createdAt), 'dd MM yyyy')}`}
                                />
                            </div>
                            <div>
                                Подробный отчет за {format(new Date(result.data.history.createdAt), 'dd MM yyyy')}
                            </div>
                            <div className={'flex flex-row items-center space-x-2'}>
                                <HiOutlineVolumeUp className={'h-6 w-6'}/>
                                <NavLink to={'/history'}>
                                    <HiOutlineXCircle className={'h-6 w-6'}/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={'container py-2.5 mx-auto grow flex flex-col space-y-4'}>
                        <div className={'grid grid-cols-5 gap-4'}>
                            <div className={'col-span-4 grid grid-rows-3'}>
                                <div className={'flex flex-row justify-between font-bold'}>
                                    <h1>
                                        Комманда: {result.data.command.name}
                                    </h1>
                                    <h1>
                                        СПИСОК: {result.data.history.historyNumber}
                                    </h1>
                                </div>
                                <div className={classNames('grid-cols-4 grid text-sm items-center px-4')}>
                                    <h1 className={'col-start-2'}>Всего в списке:</h1>
                                    <h1>Доставлено:</h1>
                                    <h1>Не доставлено:</h1>
                                </div>
                                {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                        || result.data.history.notificationMethod.toString() === notificationMethod.call.toString())
                                    &&
                                    <div className={'grid grid-cols-4 items-center px-4 bg-gray-100'}>
                                        <div>Звонок</div>
                                        <div>{result.data.history.statisctics.totalCalls} </div>
                                        <div>{result.data.history.statisctics.successfulCalls} ({(result.data.history.statisctics.successfulCalls / result.data.history.statisctics.totalCalls * 100).toFixed(1)}%)</div>
                                        <div>{result.data.history.statisctics.unSuccessfuICalls} ({(result.data.history.statisctics.successfulCalls / result.data.history.statisctics.totalCalls * 100).toFixed(1)}%)</div>
                                    </div>
                                }
                                {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                        || result.data.history.notificationMethod.toString() === notificationMethod.sms.toString())
                                    &&
                                    <div className={'grid grid-cols-4 items-center px-4 bg-gray-100'}>
                                        <div>SMS</div>
                                        <div>{result.data.history.statisctics.totalSMS} </div>
                                        <div>{result.data.history.statisctics.successfulSMS} ({(result.data.history.statisctics.successfulSMS / result.data.history.statisctics.totalSMS * 100).toFixed(1)}%)</div>
                                        <div>{result.data.history.statisctics.unSuccessfu11SMS} ({(result.data.history.statisctics.successfulSMS / result.data.history.statisctics.totalSMS * 100).toFixed(1)}%)</div>
                                    </div>
                                }
                            </div>
                            <RadioGroup as={'div'} value={status} onChange={setStatus} className={'grid grid-rows-3'}>
                                <RadioGroup.Option value={0} className={'space-x-2'}>
                                    <span>Все</span>
                                </RadioGroup.Option>
                                <RadioGroup.Option value={1} className={'space-x-2'}>
                                    <span>Доставленные</span>
                                </RadioGroup.Option>
                                <RadioGroup.Option value={2} className={'space-x-2'}>
                                    <span>Не доставленные</span>
                                </RadioGroup.Option>
                            </RadioGroup>
                        </div>
                        <div className={'grid grid-cols-5 gap-4'}>
                            <div className={'col-span-4'}>
                                <input
                                    id="login"
                                    name="login"
                                    type="text"
                                    placeholder="Введите фамилию или номер телефона"
                                    className={'block w-full rounded-md text-gray-900'}
                                />
                            </div>
                            {/*<Combobox
                                as={'div'}
                                className={'relative'}
                                value={selectedRanks}
                                onChange={handleSelect}
                                multiple
                            >
                                <Combobox.Input
                                    className={'block w-full rounded-md text-gray-900'}
                                    onChange={(event) => setQuery(event.target.value)}
                                    displayValue={(militaryRanks:Array<string>) =>
                                        militaryRanks.map((militaryRank) => militaryRank).join(', ')
                                    }
                                />
                                <Combobox.Button
                                    className={'absolute right-0 top-0 bottom-0'}
                                >
                                    <HiSelector className={'w-5 h-5'}/>
                                </Combobox.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Combobox.Options className={'absolute overflow-y-scroll w-full max-h-96 bg-white border-2 border-info rounded-lg no-scrollbar'}>
                                        {filteredRanks.map((rank,index) => (
                                            <Combobox.Option
                                                key={index}
                                                value={rank}
                                                className={'flex flex-row items-center py-2 px-1 hover:bg-gray-100 w-full'}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <HiCheck className={classNames('w-5 h-5 mr-2', selected ? 'text-info' : 'text-transparent')}/>
                                                        <h6 className={'font-medium truncate'}>{rank}</h6>
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                </Transition>
                            </Combobox>*/}
                            <div className={''}>
                                <button
                                    className={'bg-green hover:bg-darkGreen mx-auto w-full text-white py-2.5 px-10 rounded-lg'}
                                    onClick={clickHandler}
                                >
                                    Найти
                                </button>
                            </div>
                        </div>
                        {(result.isLoading || result.isFetching) ?
                            <Loading/>
                            :
                            result.data.people.length !== 0 ?
                            <div className={'grow flex flex-col py-5 space-y-2'} ref={printRef}>
                                <div className={classNames(
                                    'grid gap-4 place-items-center',
                                    (result.data.history.notificationMethod.toString() === notificationMethod.both.toString()) ? 'grid-cols-8' : 'grid-cols-5',
                                )}>
                                    <h1>ФИО</h1>
                                    <h1>Телефон</h1>
                                    {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                            || result.data.history.notificationMethod.toString() === notificationMethod.call.toString())
                                        &&
                                        <div className={'w-full col-span-3 place-items-center grid grid-cols-3 grid-rows-2'}>
                                            <h1 className={'col-span-3'}>ЗВОНОК</h1>
                                            <h1 className={''}>Статус</h1>
                                            <h1 className={''}>Время Отправки</h1>
                                            <h1 className={''}>Время Доставки</h1>
                                        </div>
                                    }
                                    {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                            || result.data.history.notificationMethod.toString() === notificationMethod.sms.toString())
                                        &&
                                        <div className={'w-full col-span-3 place-items-center grid grid-cols-3 grid-rows-2'}>
                                            <h1 className={'col-span-3'}>СМС</h1>
                                            <h1 className={''}>Статус</h1>
                                            <h1 className={''}>Время Отправки</h1>
                                            <h1 className={''}>Время Доставки</h1>
                                        </div>
                                    }
                                </div>
                                <hr className={'border-gray-900'}/>
                                {result.data.people.map((person) => {
                                        return (
                                            <div key={person.id}>
                                                <div
                                                    className={
                                                    classNames(
                                                        'grid gap-4 place-items-center py-2.5 text-center',
                                                        (result.data.history.notificationMethod.toString() === notificationMethod.both.toString()) ? 'grid-cols-8' : 'grid-cols-5',
                                                    )
                                                }>
                                                    <div>
                                                        {getFullName(person.firstName, person.lastName, person.middleName)}
                                                    </div>
                                                    <div>
                                                        {person.telephone}
                                                    </div>
                                                    {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                                            || result.data.history.notificationMethod.toString() === notificationMethod.call.toString())
                                                        &&
                                                        <>
                                                            <div>
                                                                <h1 className={`text-${smsStatusCode(person.callStatusCode).color}`}>
                                                                    {person.callStatusCode.toString()}
                                                                </h1>
                                                            </div>
                                                            <div>
                                                                <h1>send date</h1>
                                                            </div>
                                                            <div>
                                                                <h1>delivered date</h1>
                                                            </div>
                                                        </>
                                                    }
                                                    {(result.data.history.notificationMethod.toString() === notificationMethod.both.toString()
                                                            || result.data.history.notificationMethod.toString() === notificationMethod.sms.toString())
                                                        &&
                                                        <>
                                                            <div>
                                                                <h1 className={`text-${smsStatusCode(person.smsStatusCode).color}`}>
                                                                    {smsStatusCode(person.smsStatusCode).message}
                                                                </h1>
                                                            </div>
                                                            <div>
                                                                <h1>send date</h1>
                                                            </div>
                                                            <div>
                                                                <h1>delivered date</h1>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                                <hr className={'bg-gray-600'}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className={'grow flex flex-col items-center justify-center'}>
                                <h1 className={'text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'}>
                                    No Data
                                </h1>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
};
