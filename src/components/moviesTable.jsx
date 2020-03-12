import React from "react";
import Like from "./common/like";

const movieTable = props => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} style={{ cursor: "pointer" }}>
            Title
          </th>
          <th
            onClick={() => onSort("genre.name")}
            style={{ cursor: "pointer" }}
          >
            Genre
          </th>
          <th
            onClick={() => onSort("numberInStock")}
            style={{ cursor: "pointer" }}
          >
            Stock
          </th>
          <th
            onClick={() => onSort("dailyRentalRate")}
            style={{ cursor: "pointer" }}
          >
            Rate
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onLike={() => onLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default movieTable;
