import React, { Component } from "react";

class TableHeader extends Component {
  sortedIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    sortColumn.path = path;
    sortColumn.order =
      !sortColumn.order || sortColumn.order === "desc" ? "asc" : "desc";

    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}
            >
              {column.label} {this.sortedIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
