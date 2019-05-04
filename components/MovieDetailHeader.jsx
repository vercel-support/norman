import Grid from '@material-ui/core/Grid';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import _ from 'lodash';

import orange from '@material-ui/core/colors/orange';

import { PlayArrow } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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
    padding: '0em 2em',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      maxWidth: '80%',
    },
  },
  movie__released_year: {
    opacity: '0.6',
  },
  movie__concensus: {
    display: 'inline-flex',
  },
  movie__concensus_label: {
    margin: '3em 1em',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  movie__play_trailer_icon: {
    '&:hover': {
      opacity: '0.5',
    },
    display: 'inline-block',
    padding: '2.8em 0.5em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'opacity .3s ease',
  },
  movie__play_trailer_icon_label: {
    display: 'inline-block',
    position: 'relative',
    bottom: '0.3em',
  },
  movie__featured_list: {
    listStyleType: 'none',
    display: 'inline-flex',
    margin: '0 auto',
    padding: '0',
  },
  movie__featured_item: {
    paddingRight: '5em',
  },
  movie__featured_name: {
    fontWeight: 'bold',
    margin: '0 auto',
    fontSize: '14px',
  },
  movie__featured_job: {
    margin: '0 auto',
    fontSize: '14px',
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
  movie__pie_chart: {
    display: 'inline-block',
    width: '6em',
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

            { /* Section widget and concensus */ }
            <div className={classes.movie__concensus}>
              <ReactMinimalPieChart
                className={classes.movie__pie_chart}
                data={[
                  {
                    value: Number(movie.ratingValue || 0),
                    color: orange[500],
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
                /* Display trailer url if exists
                   Some url filled with empty embed utube url */
                (movie.trailerUrl && movie.trailerUrl !== 'https://www.youtube.com/embed/') ? (
                  <a href={movie.trailerUrl} className={classes.movie__play_trailer_icon}>
                    <PlayArrow />
                    <div className={classes.movie__play_trailer_icon_label}>Play trailer</div>
                  </a>
                ) : ''
              }

              <Link as={`/${movie.slug}/play`} href={`/play/${movie.slug}`}>
                <a className={classes.movie__play_trailer_icon}>
                  <PlayArrow />
                  <div className={classes.movie__play_trailer_icon_label}>Play Movie</div>
                </a>
              </Link>
            </div>
            { /* Section overview */ }
            <div className={classes.movie__component_section}>
              <h3 className={classes.movie__component_title}>
                Overview
              </h3>
              <p>{movie.summary}</p>
            </div>

            { /* Section feature crew */ }
            <div className={classes.movie__component_section}>
              <h3 className={classes.movie__component_title}>Featured by</h3>
              <ol className={classes.movie__featured_list}>
                {
                  _.map(movie.directors, director => (
                    <li className={classes.movie__featured_item} key={director.label}>
                      <p className={classes.movie__featured_name}>{director.label}</p>
                      <p className={classes.movie__featured_job}>Director</p>
                    </li>
                  ))
                }
              </ol>

              <ol className={classes.movie__featured_list}>
                {
                  _.map(movie.stars, star => (
                    <li className={classes.movie__featured_item} key={star.label}>
                      <p className={classes.movie__featured_name}>{star.label}</p>
                      <p className={classes.movie__featured_job}>Cast</p>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(MovieDetailHeader);
