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
        <div>
            <div>Id <input className="addTable" type="number" onChange={event => (newPerson.id = +event.currentTarget.value)} /> </div>
            <div>Last name<input className="addTable" type="text" onChange={event => (newPerson.lastName = event.currentTarget.value)}/> </div>
            <div>First name<input className="addTable" type="text" onChange={event => (newPerson.firstName = event.currentTarget.value)}/> </div>
            <div>Phone <input className="addTable" type="text" onChange={event => (newPerson.phone = event.currentTarget.value)}/> </div>
            <div>Email <input className="addTable" type="text" onChange={event => (newPerson.email = event.currentTarget.value)}/> </div>
            <div className="addPersonButton"><button onClick={() => props.personsStore?.addNewPerson(newPerson)}>Добавить</button> </div>
        </div>
    )
}