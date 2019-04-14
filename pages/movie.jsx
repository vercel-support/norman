import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import getMovie from '../api/get-movie';
import MovieHeader from '../components/MovieHeader';
import MovieAppbar from '../components/MovieAppbar';

const styles = {};

const Movie = ({ movie }) => (
  <React.Fragment>
    <MovieAppbar />
    <MovieHeader movie={movie} />
  </React.Fragment>
);

Movie.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const movie = await getMovie(slug);

  return { movie };
};

export default withStyles(styles)(Movie);
