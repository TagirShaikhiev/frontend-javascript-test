import React from 'react'
import { IPerson } from './Interfaces'

type Props = {
    person: IPerson;
    setPersonInfo(person: IPerson): void;
}

export const Row: React.FC<Props> = (props) => {
    if (props.person !== undefined) {
    return (
        <tr onClick={() => props.setPersonInfo(props.person)}>
            <td>{props.person.id}</td>
            <td>{props.person.firstName}</td>
            <td>{props.person.lastName}</td>
            <td>{props.person.email}</td>
            <td>{props.person.phone}</td>    
        </tr>
    )
    }
    return <div></div>
}
