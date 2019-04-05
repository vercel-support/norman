import React from 'react';
import fetch from 'isomorphic-unfetch';
import config from 'config';

import {
  Container,
} from 'reactstrap';

import MovieGrid from '../components/MovieGrid';


const Index = ({ movies }) => (
  <Container>
    <MovieGrid movies={movies} />
  </Container>
);

Index.getInitialProps = async () => {
  const apiUrl = config.get('API_URL');
  const movies = await fetch(`${apiUrl}/movie?type=movie`).then(res => res.json());

  return { movies };
};

export default Index;
