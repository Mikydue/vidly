import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,

    searchQuery: "",
    sortColumn: {
      path: "",
      order: "",
    },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleQuery = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movieshas already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
  };

  //Sto clonando tutti gli oggetti per non riferirmi all'originale per colpa dei puntatori
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      const re = new RegExp(`.*${searchQuery}.*`, "i");
      console.log(re);
      filtered = allMovies.filter((movie) => re.test(movie.title));
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database!</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
            items={this.state.genres}
          />
        </div>
        <div className="col">
          <Link to="/movies/new">
            <button className="btn btn-primary mb-2">New Movie</button>
          </Link>
          <p>Showing {totalCount} Movies!</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleQuery}
          />

          <MoviesTable
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            movies={movies}
            genres={this.state.genres}
          ></MoviesTable>

          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
