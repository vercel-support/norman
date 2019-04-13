import React from 'react';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import withStyles from 'react-jss';

import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import { Timer, Star, PlayCircleOutline } from '@material-ui/icons';

import qualityStyles from '../utils/quality-styles';

const styles = {
  movie__wrapper: {
    maxWidth: '165px',
    width: '100%',
  },
  movie__name__wrapper: {
    height: '30px',
  },
  movie__name: {
    fontSize: '14px',
  },
  movie__poster: {
    borderRadius: '5px',
  },
  movie__quality__wrapper: {
    borderRadius: '0px 5px 0px 5px',
    float: 'right',
    height: '16px',
    position: 'relative',
    top: '16px',
    width: '20%',
  },
  movie__quality: {
    fontSize: '10px',
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
  },
  movie__duration_and_rating__wrapper: {
    backgroundColor: blueGrey[900],
    borderRadius: '5px 0px 5px 0px',
    display: 'flex',
    position: 'relative',
    top: '2em',
    width: '50%',
  },
  movie__duration_and_rating: {
    fontSize: '10px',
    fontWeight: 'bold',
    padding: 3,
  },
  movie__duration_and_rating_icon: {
    color: 'yellow',
    fontSize: '10px',
    fontWeight: 'bold',
    marginTop: '3px',
  },
  movie__poster__wrapper: {
  },
  movie__poster_overlay: {
    '&:hover': {
      opacity: '0.8',
    },
    backgroundColor: grey[900],
    borderRadius: '5px',
    height: '14.4em',
    marginTop: '-14.65em',
    opacity: '0',
    position: 'absolute',
    width: '10.32em',
    transition: 'opacity .3s ease',
  },
  movie__play_icon: {
    color: 'white',
    fontSize: '50px',
    position: 'relative',
    top: '1.8em',
    left: '1.1em',
  },
};

const MovieCard = ({ movie, classes }) => (
  <div className={classes.movie__wrapper}>
    <Link as={`/${movie.slug}`} href={`/movie/${movie.slug}`}>
      <div>
        {/* Duration and rating */}
        <span className={classes.movie__duration_and_rating__wrapper}>
          <Star className={classes.movie__duration_and_rating_icon} />
          <Typography component="h3" variant="h3" color="inherit" className={classes.movie__duration_and_rating}>
            {Number(movie.ratingValue).toFixed(2)}
          </Typography>

          <Timer className={classes.movie__duration_and_rating_icon} />
          <Typography component="h3" variant="h3" color="inherit" className={classes.movie__duration_and_rating}>
            {movie.duration}
          </Typography>
        </span>

        {/* Quality */}
        <span className={classes.movie__quality__wrapper} style={{ 'backgroundColor': qualityStyles[movie.quality].color }}>
          <Typography component="h3" variant="h3" color="inherit" className={classes.movie__quality}>
            {qualityStyles[movie.quality].label}
          </Typography>
        </span>

        {/* Poster image */}
        <div className={classes.movie__poster__wrapper}>
          <LazyLoad height="100%" offset={100} once>
            <img className={classes.movie__poster} width="100%" height="230" src={movie.posterUrl} alt={movie.name} />
          </LazyLoad>
          <div className={classes.movie__poster_overlay}>
            <PlayCircleOutline className={classes.movie__play_icon} />
          </div>
        </div>
      </div>
    </Link>

    {/* Movie name */}
    <div className={classes.movie__name__wrapper}>
      <Typography component="h3" variant="h3" color="inherit" className={classes.movie__name}>
        {movie.name}
      </Typography>
    </div>
  </div>
);

export default withStyles(styles)(MovieCard);
