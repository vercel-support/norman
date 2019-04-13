const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');
const config = require('config');

const movieCache = new LRU();

const getMovie = async (slug) => {
  const apiUrl = config.get('API_URL');
  const endPoint = `${apiUrl}/movie/${slug}`;

  let movie = movieCache.get(endPoint);

  if (!movie) {
    movie = await fetch(`${apiUrl}/movie/${slug}`).then(res => res.json());
    movieCache.set(endPoint, movie);

    return movie;
  }

  return movie;
};

module.exports = getMovie;
