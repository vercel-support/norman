const fetch = require('isomorphic-unfetch');
const _ = require('lodash');
const LRU = require('lru-cache');
const config = require('config');
const { stringify } = require('query-string');

const moviesCache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

const getMovies = async (queryObject) => {
  const apiUrl = config.get('API_URL');

  const clonedQueryObject = _.cloneDeep(queryObject);

  _.defaults(clonedQueryObject, {
    type: 'movie',
    page: 1,
  });

  const queryString = stringify(clonedQueryObject);
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
