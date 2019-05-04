const fetch = require('isomorphic-unfetch');
const config = require('config');
const LRU = require('lru-cache');

const moviePlayCache = new LRU({
  max: 1000,
  maxAge: 1000 * 60 * 10,
});

const getMoviePlay = async (slug) => {
  const apiUrl = config.get('API_URL');
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
