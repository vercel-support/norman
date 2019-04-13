import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import getMovie from '../api/get-movie';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      width: 1280,
    },
    paddingTop: '50px',
    paddingBottom: '50px',
  },
  gridItem: {
    padding: '0px 1%',
  },
  movie__header: {
  },
  movie__header_overlay: {
    backgroundColor: 'rgba(96, 125, 139, 0.7)',
  },
});

const Movie = ({ classes, movie }) => (
  <div className={classes.movie__header} style={{ backgroundImage: `url(${movie.coverImageUrl})`, backgroundColor: 'red' }}>
    <div className={classes.movie__header_overlay}>
      <Grid container justify="center">
        <Grid container className={classes.container} alignItems="center" justify="center">
          { JSON.stringify(movie, null, 2)}
        </Grid>
      </Grid>
    </div>
  </div>
);

Movie.getInitialProps = async ({ query }) => {
  const { slug } = query;

  const movie = await getMovie(slug);

  return { movie };
};

export default withStyles(styles)(Movie);
