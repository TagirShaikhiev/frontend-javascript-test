import React from 'react'
import { PersonsStore, SortParam } from './Stores/PersonStore'
import { IPerson } from './Interfaces'

type Props = {
    columnName: string;
    columnKey: keyof IPerson;
    sortingParam: SortParam | null;
    onChange(sortingParam: SortParam): void;
}

export const ColumnHeader: React.FC<Props> = (props) =>{
    return (
        <td 
        onClick={() => props.onChange(composeSorting(props.columnKey, props.sortingParam))}
        > {props.columnName} </td>
        )
}

function composeSorting(columnKey: keyof IPerson, sortingParam: SortParam | null): SortParam {
    
    if (sortingParam === null || sortingParam.column !== columnKey) {
        return {column: columnKey, isAscending: true};
    }
    return {column: columnKey, isAscending: !sortingParam.isAscending};
    
}