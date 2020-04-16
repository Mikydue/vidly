import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/movies";

function movieUrl(id) {
  return apiEndpoint + "/" + id;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return http.post(apiEndpoint, movie);
  }
}
