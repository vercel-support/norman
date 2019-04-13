import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MovieGrid from '../components/MovieGrid';

import getMovies from '../api/get-movies';

const styles = () => ({});

const Index = ({ classes, movies }) => (
  <Grid container justify="center" className={classes.root}>
    <MovieGrid movies={movies} />
  </Grid>
);

Index.getInitialProps = async () => {
  const movies = await getMovies();

  return { movies };
};

export default withStyles(styles)(Index);
