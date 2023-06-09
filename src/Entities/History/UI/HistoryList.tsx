import React from 'react';
import { IHistory } from 'Shared';
import {HistoryItem} from "./HistoryItem";


type HistoryListProps = {
    list: IHistory[],
}
export const HistoryList = (props: HistoryListProps) => {
    return (
        <div className={'absolute top-0 left-0 bottom-0 right-0 overflow-y-scroll flex flex-col space-y-4'}>
            {props.list && props.list.map((item)=>{
                return (
                    <HistoryItem key={item.id} item={item}/>
                )
            })}
        </div>
    );
};
