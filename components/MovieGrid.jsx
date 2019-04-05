import React, { Fragment } from 'react';
import _ from 'lodash';
import withStyles from 'react-jss';

import {
  Row, Col,
} from 'reactstrap';

import MovieCard from './MovieCard';

const chunkSize = 6;

const styles = {
  movie__wrapper: {
    'paddingTop': '10px',
    'color': '#fff',
  },
};

const MovieGrid = ({ movies, classes }) => (
  <Fragment>
    {
      _.map(_.chunk(movies, chunkSize), chunkedMovies => (
        <div key={chunkedMovies[0]._id} className={classes.movie__wrapper}>
          <Row key={chunkedMovies[0]._id}>
            {
              _.map(chunkedMovies, movie => (
                <Col key={movie._id} xs="2">
                  <MovieCard movie={movie} />
                </Col>
              ))
            }
          </Row>
        </div>
      ))
    }
  </Fragment>
);

export default withStyles(styles)(MovieGrid);
