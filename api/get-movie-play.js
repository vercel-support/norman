const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');
const config = require('../next.config');

const moviePlayCache = new LRU({
  max: 1000,
  maxAge: 1000 * 60 * 10,
});

const getMoviePlay = async (slug) => {
  const apiUrl = config.env.API_URL;
  const endPoint = `${apiUrl}/movie/${slug}/play`;

  let moviePlay = moviePlayCache.get(endPoint);

  if (!moviePlay) {
    moviePlay = await fetch(endPoint).then(res => res.json());
    moviePlayCache.set(endPoint, moviePlay);

    return moviePlay;
  }


  return moviePlay;
};

module.exports = getMoviePlay;
