const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');
const config = require('config');

const moviesCache = new LRU();

const getMovies = async () => {
  const apiUrl = config.get('API_URL');
  const endPoint = `${apiUrl}/movie?type=movie`;

  let movies = moviesCache.get(endPoint);

  if (!movies) {
    movies = await fetch(endPoint).then(res => res.json());
    moviesCache.set(endPoint, movies);

    return movies;
  }

  return movies;
};

module.exports = getMovies;
