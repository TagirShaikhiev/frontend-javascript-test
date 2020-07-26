import React from 'react'
import { IPerson } from './Interfaces'

type Props = {
    person: IPerson;
}

export const Row: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.person.id}</td>
            <td>{props.person.firstName}</td>
            <td>{props.person.lastName}</td>
            <td>{props.person.email}</td>
            <td>{props.person.phone}</td>    
        </tr>
    )
}