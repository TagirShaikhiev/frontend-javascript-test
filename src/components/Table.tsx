import React from "react";
import { ColumnHeader } from "./ColumnHeader";
import { Row } from "./Row";
import { inject, observer } from "mobx-react";
import { PersonsStore, SortParam } from "./Stores/PersonStore";
import { Pagination } from "./Pagination";
import { ShowPersonInfo } from "./PersonInfo";
import { AddTableRow } from "./AddTableRow";
import { IPerson } from "./Interfaces";
enum Status {
  empty,
  small,
  big,
}

type Props = {
  personsStore?: PersonsStore;
};

type State = {
  search: string;
};

let currentStatus: Status = Status.small;
let filter: string = "";

@inject("personsStore")
@observer
export class Table extends React.Component<Props, State> {
  state: State = { search: "" };

  componentDidMount(): void {
    if (currentStatus === Status.small) this.props.personsStore?.init(false);
    else if (currentStatus === Status.big) this.props.personsStore?.init(true);
  }

  setStatus(stat: boolean): void {
    this.props.personsStore?.init(stat);
  }

  render() {
    const { personsStore } = this.props;

    if (personsStore?.isLoading) {
      return <div className="container">Is loading</div>;
    }

    return (
      <div className="container">
        <div className="addNewPerson">
          <button className="">Добавить данные</button>
          <AddTableRow personsStore={personsStore} />
        </div>
        <div className="server">
          <button
            onClick={() => {
              this.setStatus(false);
            }}
          >
            Small data
          </button>
          <button
            onClick={() => {
              this.setStatus(true);
            }}
          >
            Big data
          </button>
        </div>
        <div className="search">
          <input
            type="text"
            value={this.state.search}
            onChange={(event) =>
              this.setState({ search: event.currentTarget.value })
            }
          />
          <button
            onClick={() =>
              this.props.personsStore?.setSearch(this.state.search)
            }
          >
            Поиск
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="tableHeader">{this.columnHeaders}</tr>
          </thead>
          <tbody>
            {personsStore!.currentPersons.map((person) => (
              <Row
                person={person}
                setPersonInfo={() => {
                  personsStore!.setCurrentPerson(person);
                }}
              />
            ))}
          </tbody>
        </table>
        <div className="pages">
          <Pagination
            currentPage={personsStore!.currentPage}
            availablePages={personsStore!.availablePages}
            onChange={this.changePage}
          />
        </div>
        {<ShowPersonInfo person={this.props.personsStore!.currentPerson} />}
      </div>
    );
  }

  get columnHeaders() {
    const { personsStore } = this.props;
    const columns: Array<[keyof IPerson, string]> = [
      ["id", "ID"],
      ["firstName", "First Name"],
      ["lastName", "Last Name"],
      ["email", "Email"],
      ["phone", "Phone"],
    ];
    return columns.map(([columnKey, columnName]) => (
      <ColumnHeader
        columnName={columnName}
        columnKey={columnKey}
        sortingParam={personsStore!.sorting}
        onChange={this.changeSorting}
      />
    ));
  }

  changePage = (pageNumber: number) => {
    this.props.personsStore?.setPage(pageNumber);
  };

  changeSorting = (sortingParams: SortParam) => {
    this.props.personsStore?.setSorting(sortingParams);
  };
}
