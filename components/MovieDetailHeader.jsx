import Grid from '@material-ui/core/Grid';
import LazyLoad from 'react-lazyload';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import MovieDetailFeaturedCrews from './MovieDetailFeaturedCrews';
import MovieDetailGenreList from './MovieDetailGenreList';
import MovieDetailWidgets from './MovieDetailWidgets';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      width: 1280,
      display: 'flex',
    },
    padding: '2em 0em',
  },
  gridItem: {
    padding: '0px 1%',
  },
  movie__header: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  movie__header_overlay: {
    backgroundColor: 'rgba(14.12%, 14.51%, 16.86%, 0.95)',
  },
  movie__poster_container: {
    padding: '2em 2em',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      maxWidth: '20%',
    },
  },
  movie__poster: {
    borderRadius: '5px',
  },
  movie__description: {
    textAlign: 'justify',
    padding: '0em 1em',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      maxWidth: '80%',
    },
  },
  movie__released_year: {
    opacity: '0.6',
  },
  movie__genres: {
    listStyleType: 'none',
    display: 'inline-flex',
    margin: '0 auto',
    padding: '0',
  },
  movie__genre_item: {
    paddingRight: '1em',
  },
  movie__component_title: {
    fontWeight: 'bold',
  },
  movie__component_section: {
    marginTop: '1em',
  },
});

const MovieDetailHeader = ({ movie, classes }) => (
  <div className={classes.movie__header} style={{ backgroundImage: `url(${movie.coverImageUrl})` }}>
    <Grid container className={classes.movie__header_overlay}>
      <Grid container justify="center">
        <Grid item className={classes.container}>

          { /* Section poster */ }
          <Grid item className={classes.movie__poster_container}>
            <LazyLoad height="100%" offset={100} once>
              <img className={classes.movie__poster} src={movie.posterUrl} alt={movie.name} />
            </LazyLoad>
          </Grid>
          <div className={classes.movie__description}>
            { /* Section name */ }
            <h2>
              {movie.name}
              <span className={classes.movie__released_year}>
                {` (${movie.released.year})`}
              </span>
            </h2>

            <Divider variant="fullWidth" />
            { /* Section widget and concensus */ }
            <MovieDetailWidgets
              ratingValue={movie.ratingValue}
              trailerUrl={movie.trailerUrl}
              slug={movie.slug}
            />

            <Divider variant="fullWidth" />
            { /* Section genre */ }
            <MovieDetailGenreList genres={movie.genres} />

            <Divider variant="fullWidth" />
            { /* Section overview */ }
            <div className={classes.movie__component_section}>
              <h3 className={classes.movie__component_title}>
                Overview
              </h3>
              <p>{movie.summary}</p>
            </div>

            <Divider variant="fullWidth" />
            { /* Section featured crew */ }
            <MovieDetailFeaturedCrews
              stars={movie.stars}
              directors={movie.directors}
            />

            <Divider variant="fullWidth" />
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(MovieDetailHeader);
