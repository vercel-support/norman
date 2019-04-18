import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import getMovie from '../api/get-movie';
import MovieDetailHeader from '../components/MovieDetailHeader';
import MovieAppbar from '../components/MovieAppbar';

const styles = {};

const MovieDetail = ({ movie }) => (
  <React.Fragment>
    <MovieAppbar />
    <MovieDetailHeader movie={movie} />
  </React.Fragment>
);

MovieDetail.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const movie = await getMovie(slug);

  return { movie };
};

export default withStyles(styles)(MovieDetail);
