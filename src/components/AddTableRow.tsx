import React from 'react'
import { PersonsStore } from './Stores/PersonStore';
import { IPerson } from './Interfaces'

type personType = {
    person: IPerson;
}

type Props = {
    personsStore?: PersonsStore;
};

export const AddTableRow: React.FC<Props> = (props) => { 
    const newPerson: IPerson = {
        id: 0,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: {
            city: '',
            state: '',
            streetAddress: '',
            zip: '',
        },
        description: '',
    };

    return (
        <div className="newPerson">
            Id <input name="ID" type="number" onChange={event => (newPerson.id = +event.currentTarget.value)}/> <hr />
            Last name<input type="text" onChange={event => (newPerson.lastName = event.currentTarget.value)}/> <hr />
            First name<input type="text" onChange={event => (newPerson.firstName = event.currentTarget.value)}/> <hr />
            Phone <input type="text" onChange={event => (newPerson.phone = event.currentTarget.value)}/> <hr />
            Email <input type="text" onChange={event => (newPerson.email = event.currentTarget.value)}/> <hr />
            <button onClick={() => props.personsStore?.addNewPerson(newPerson)}>Добавить</button> <hr />
        </div>
    )
}