import React from 'react'
import { ColumnHeader } from './ColumnHeader'
import { IPerson } from './Interfaces'
import { Row } from './Row'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { PersonsStore } from './Stores/PersonStore'
// import { Pagination } from './Pagination'
// import { StringInfo } from './StringInfo'

type Props = {
    personsStore?: PersonsStore;
}

const TableComponent: React.FC<Props> = (props) => {
    return (
        <table className="table">
            <thead >
                <tr className='tableHeader'>
                    <ColumnHeader columnName="ID"/>
                    <ColumnHeader columnName="First Name"/>
                    <ColumnHeader columnName="LastName"/>
                    <ColumnHeader columnName="Email"/>
                    <ColumnHeader columnName="Phone"/>
                </tr>  
            </thead>
            <tbody>
                {console.log(props.personsStore!)}
                {props.personsStore!.getCurrentPersons().map(persons => <Row person={persons} />)}
            </tbody>
            {/* <Pagination />
            <StringInfo /> */}
        </table>
    )
}

export const Table = inject('personsStore')(observer(TableComponent));