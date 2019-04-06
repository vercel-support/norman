import React from 'react';
import LazyLoad from 'react-lazyload';
import withStyles from 'react-jss';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Timer, Star } from '@material-ui/icons';

import qualityStyles from '../utils/quality-styles';

const styles = {
  movie__wrapper: {
    maxWidth: '165px',
    width: '100%',
    minHeight: '300px',
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
    top: '32.4px',
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
};

const MovieCard = ({ movie, classes }) => (
  <div className={classes.movie__wrapper}>
    <div className={classes.movie__duration_and_rating__wrapper}>
      <Star className={classes.movie__duration_and_rating_icon} />
      <Typography component="h3" variant="h3" color="inherit" className={classes.movie__duration_and_rating}>
        {Number(movie.ratingValue).toFixed(2)}
      </Typography>

      <Timer className={classes.movie__duration_and_rating_icon} />
      <Typography component="h3" variant="h3" color="inherit" className={classes.movie__duration_and_rating}>
        {movie.duration}
      </Typography>
    </div>

    <div className={classes.movie__quality__wrapper} style={{ 'backgroundColor': qualityStyles[movie.quality].color }}>
      <Typography component="h3" variant="h3" color="inherit" className={classes.movie__quality}>
        {qualityStyles[movie.quality].label}
      </Typography>
    </div>

    <LazyLoad height="100%" offset={100} once>
      <img className={classes.movie__poster} width="100%" height="230" src={movie.posterUrl} alt={movie.name} />
    </LazyLoad>

    <Typography component="h3" variant="h3" color="inherit" className={classes.movie__name}>
      {movie.name}
    </Typography>
  </div>
);

export default withStyles(styles)(MovieCard);
