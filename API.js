// Getting Movies
const API_ENDPOINT = "http://127.0.0.1:8000/movies";
export const getMovies = () => {
  return fetch(API_ENDPOINT).then((res) => res.json());
};
