import React from 'react'

type Props = {
    columnName: string;
}

export const ColumnHeader: React.FC<Props> = (props) =>{
    return (
        <td> {props.columnName} </td>
    )
}