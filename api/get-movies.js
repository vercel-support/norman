const fetch = require('isomorphic-unfetch');
const _ = require('lodash');
const LRU = require('lru-cache');
const { stringify } = require('query-string');

const moviesCache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

const getMovies = async (queryObject = {}) => {
  const apiUrl = process.env.API_URL;

  if (!queryObject.type) {
    queryObject.type = 'movie';
  }

  if (!queryObject.page) {
    queryObject.page = '1';
  }

  const queryString = stringify(queryObject);
  const endPoint = `${apiUrl}/movie?${queryString}`;

  let movies = moviesCache.get(endPoint);

  if (!movies) {
    movies = await fetch(endPoint).then(res => res.json());
    moviesCache.set(endPoint, movies);

    return movies;
  }

  return movies;
};

module.exports = getMovies;
