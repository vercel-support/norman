import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MovieAppbar from '../components/MovieAppbar';
import MovieGrid from '../components/MovieGrid';
import getMovies from '../api/get-movies';

const styles = () => {};

const Index = ({ movies }) => (
  <React.Fragment>
    <MovieAppbar />
    <Grid container justify="center">
      <MovieGrid movies={movies} />
    </Grid>
  </React.Fragment>
);

Index.getInitialProps = async () => {
  const movies = await getMovies();

  return { movies };
};

export default withStyles(styles)(Index);
