import { IPerson } from "../Interfaces"
import { observable, computed } from 'mobx'


export class PersonsStore {
    @observable persons: IPerson[] = [
        {
            id: 101,
            firstName: 'Sue',
            lastName: 'Corson',
            email: 'DWhalley@in.gov',
            phone: '(612)211-6296',
            address: {
                streetAddress: '9792 Mattis Ct',
                city: 'Waukesha',
                state: 'WI',
                zip: '22178'
            },
            description: 'et lacus magna dolor...',
        }
    ];  
    // @computed 
    getCurrentPersons(): IPerson[] { return this.persons }
}

