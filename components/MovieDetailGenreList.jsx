import React from 'react';
import _ from 'lodash';
import withStyles from 'react-jss';
import Chip from '@material-ui/core/Chip';

const styles = () => ({
  movie__component_section: {
    // marginTop: '1em',
  },
  movie__component_title: {
    fontWeight: 'bold',
  },
  movie__genre_list: {
    listStyleType: 'none',
    display: 'inline-flex',
    margin: '0 auto',
    padding: '0',
  },
  movie__genre_item: {
    // minWidth: '10em',
    // marginTop: '1em',
    marginRight: '1em',
  },
  movie__genre_name: {
    margin: '0 auto',
    fontSize: '14px',
    // color: 'white',
  },
});

const MovieDetailGenreList = ({ classes, genres }) => (
  <div className={classes.movie__component_section}>
    <h3 className={classes.movie__component_title}>Genre (s)</h3>
    <ol className={classes.movie__genre_list}>
      {
        _.map(genres, genre => (
          <li className={classes.movie__genre_item} key={genre._id}>
            <Chip label={genre.label || '-'} className={classes.movie__genre_name} />
          </li>
        ))
      }
    </ol>
  </div>
);

export default withStyles(styles)(MovieDetailGenreList);
