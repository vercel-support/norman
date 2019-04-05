import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import withStyles from 'react-jss';

const styles = {
  movie__name: {
    'padding': '5px',
    'fontSize': '13px',
  },
  movie__poster: {
    'borderRadius': '10px',
  },
  movie__quality: {
    'fontSize': '13px',
    'fontWeight': 'bold',
  },
  movie__quality__wrapper: {
    'position': 'absolute',
    'width': '32px',
    'right': '15px',
    'backgroundColor': 'green',
    'textAlign': 'center',
    'borderRadius': '0px 0px 0px 10px',
  },
};

const MovieCard = ({ movie, classes }) => (
  <Fragment>
    <LazyLoad height="100%" offset={100} once>
      <div className={classes.movie__quality__wrapper}>
        <span className={classes.movie__quality}>HD</span>
      </div>
      <img className={classes.movie__poster} width="100%" height="230" src={movie.posterUrl} alt={movie.name} />
    </LazyLoad>
    <h3 className={classes.movie__name}>{movie.name}</h3>
  </Fragment>
);

export default withStyles(styles)(MovieCard);
