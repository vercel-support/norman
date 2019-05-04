const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');
const config = require('config');

const movieCache = new LRU({
  max: 1000,
  maxAge: 1000 * 60 * 60 * 24,
});

const getMovie = async (slug) => {
  const apiUrl = config.get('API_URL');
  const endPoint = `${apiUrl}/movie/${slug}`;

  let movie = movieCache.get(endPoint);

  if (!movie) {
    movie = await fetch(endPoint).then(res => res.json());
    movieCache.set(endPoint, movie);

    return movie;
  }

  return movie;
};

module.exports = getMovie;
