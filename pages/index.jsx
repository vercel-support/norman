import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';
import config from 'config';
import MovieGrid from '../components/MovieGrid';

const styles = () => ({
  root: {
    backgroundColor: '#000000',
    color: '#fff',
  },
});

const Index = ({ classes, movies }) => (
  <Grid container justify="center" className={classes.root}>
    <MovieGrid movies={movies} />
  </Grid>
);

Index.getInitialProps = async () => {
  const apiUrl = config.get('API_URL');
  const movies = await fetch(`${apiUrl}/movie?type=movie`).then(res => res.json());

  return { movies };
};

export default withStyles(styles)(Index);
