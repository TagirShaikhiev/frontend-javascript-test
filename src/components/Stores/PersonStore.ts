import { IPerson } from '../Interfaces'
import { observable, computed, action } from 'mobx'
import { networkService } from '../../services/network.service'

export type SortParam = {
    column: keyof IPerson;
    isAscending: boolean;
} 

let big: boolean = false;

export class PersonsStore {

    @observable 
    private _persons: IPerson[] = [];
    
    @observable
    private _isLoading: boolean = false;

    @observable
    private _currentPage: number = 0;

    @observable
    private _availablePages: number = 0;

    @observable
    private _sorting: SortParam | null = null;

    @observable
    private _currentPerson: IPerson = this._persons[0];

    @observable
    private _searchTerm: string = '';

    @computed
    get sorting(): SortParam | null {
        return this._sorting;
    }

    @computed
    get isLoading(): boolean {
        return this._isLoading;   
    }

    @computed
    get searchTerm(): string {
        return this._searchTerm;   
    }

    @computed 
    get currentPersons(): IPerson[] {
    
        let copy = [...this._persons];

        if (this._sorting != null && copy.length > 0) {
            const arr = this._sorting.isAscending;
            const key: keyof IPerson = this._sorting.column;
            if (typeof copy[0][key] === "string") {
                copy.sort((prev, next) => prev[key].toString().localeCompare(next[key].toString()) * ( arr? 1:-1 ));
            } else {
                copy.sort((prev, next) => ((prev[key] as number) - (next[key] as number)) * ( arr? 1:-1 ));    
            }
        } 
        return copy.filter(person => `${person.id} ${person.firstName} ${person.lastName} ${person.email} ${person.phone}`.toLowerCase().includes(this.searchTerm.toLowerCase())).slice(this._currentPage * 50, this._currentPage * 50 + 50);
    }

    @computed 
    get availablePages(): number { 
        return this._availablePages;
    }

    @computed 
    get currentPage(): number { 
        return this._currentPage;
    }

    @computed 
    get currentPerson(): IPerson { 
        return this._currentPerson;
    }

    @action
    setPage(page: number): void {
        this._currentPage = page;
    }

    @action 
    async init(big: boolean) {
        this._isLoading = true;
        if (big) {
        this._persons = await networkService.get<IPerson[]>('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
        }
        else {
            this._persons = await networkService.get<IPerson[]>('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')       
        }
        this._availablePages = Math.ceil(this._persons.length / 50);
        this._isLoading = false;
    }

    @action
    setSorting(sortingParams: SortParam) {
        this._sorting = sortingParams;          
    }

    @action
    addNewPerson(newPerson: IPerson) {
        this._persons.unshift(newPerson);          
    }

    @action
    setSearch(search: string) {
        this._searchTerm = search;
    }

    @action
    setCurrentPerson (curPerson: IPerson) {
            this._currentPerson = curPerson;
    }
}

  