import React from 'react';
import _ from 'lodash';
import withStyles from 'react-jss';
import Grid from '@material-ui/core/Grid';

import MovieCard from './MovieCard';

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
});

const MovieGrid = ({ movies, classes }) => (
  <Grid container className={classes.container} alignItems="center" justify="center">
    {
      _.map((movies), movie => (
        <Grid item className={classes.gridItem} key={movie._id}>
          <MovieCard movie={movie} />
        </Grid>
      ))
    }
  </Grid>
);

export default withStyles(styles)(MovieGrid);
