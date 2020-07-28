import React from 'react'
import { IPerson } from './Interfaces'

type Props = {
    person: IPerson;
}

export const ShowPersonInfo: React.FC<Props> = (props) => {
    if (props.person !== undefined) {
        return (
            <div className="personInfo" >   
                    Выбран пользователь: <b>{props.person.firstName} {props.person.lastName}</b> <hr />
                    Описание: <b>{props.person.description} </b>  <hr />
                    Адрес проживания: <b>{props.person.address.streetAddress} </b>  <hr />
                    Город: <b>{props.person.address.city}</b>  <hr />
                    Провинция/штат: <b>{props.person.address.state}</b>  <hr />
                    Индекс <b>{props.person.address.zip}</b> <hr />
            </div>
        )
    }
    return <div></div>;   
}
