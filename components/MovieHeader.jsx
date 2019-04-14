import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import LazyLoad from 'react-lazyload';
import { withStyles } from '@material-ui/core/styles';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { PlayArrow } from '@material-ui/icons';

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
  },
  movie__poster: {
    borderRadius: '5px',
  },
  movie__description: {
    textAlign: 'justify',
    padding: '0em 2em',
  },
  movie__released_year: {
    opacity: '0.6',
  },
  movie__concensus: {
    maxWidth: '15em',
    display: 'inline-flex',
  },
  movie__concensus_label: {
    padding: '1.5em 0.5em',
    fontWeight: 'bold',
  },
  movie__play_trailer_icon: {
    '&:hover': {
      opacity: '0.5',
    },
    display: 'inline-flex',
    padding: '2em 0.5em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'opacity .3s ease',
  },
  movie__play_trailer_icon_label: {
    marginTop: '0.2em',
  },
  movie__featured_crew: {
    listStyleType: 'none',
    display: 'inline-flex',
    margin: '0 auto',
    padding: '0',
  },
  movie__featured_crew_item: {
    paddingRight: '5em',
  },
  movie__featured_crew_name: {
    fontWeight: 'bold',
    margin: '0 auto',
    fontSize: '14px',
  },
  movie__featured_crew_job: {
    margin: '0 auto',
    fontSize: '14px',
  },
});

const MovieHeader = ({ movie, classes }) => (
  <div className={classes.movie__header} style={{ backgroundImage: `url(${movie.coverImageUrl})` }}>
    <Grid container className={classes.movie__header_overlay}>
      <Grid container justify="center">
        <Grid item className={classes.container}>
          <Grid item className={classes.movie__poster_container}>
            <LazyLoad height="100%" offset={100} once>
              <img className={classes.movie__poster} src={movie.posterUrl} alt={movie.name} />
            </LazyLoad>
          </Grid>
          <div className={classes.movie__description}>
            <h2>
              {movie.name}
              <span className={classes.movie__released_year}>
                {` (${movie.released.year})`}
              </span>
            </h2>
            <div className={classes.movie__concensus}>
              <ReactMinimalPieChart
                data={[
                  {
                    value: Number(movie.ratingValue || 0),
                    color: '#E38627',
                  }]}
                totalValue={10}
                lineWidth={20}
                label
                labelStyle={{
                  fontSize: '40px',
                  fontFamily: 'sans-serif',
                }}
                labelPosition={0}
                radius={50}
              />
              <span className={classes.movie__concensus_label}>User score</span>
              {
                // Display trailer url if exists
                movie.trailerUrl ? (
                  <a href={movie.trailerUrl} className={classes.movie__play_trailer_icon}>
                    <PlayArrow />
                    <div className={classes.movie__play_trailer_icon_label}>Play trailer</div>
                  </a>
                ) : ''
              }
            </div>
            <h3>Overview</h3>
            <p>{movie.summary}</p>
            <h3>Featured Crew</h3>
            <ol className={classes.movie__featured_crew}>
              {
                _.map(movie.directors, director => (
                  <li className={classes.movie__featured_crew_item} key={director.label}>
                    <p className={classes.movie__featured_crew_name}>{director.label}</p>
                    <p className={classes.movie__featured_crew_job}>Director</p>
                  </li>
                ))
              }
            </ol>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(MovieHeader);
