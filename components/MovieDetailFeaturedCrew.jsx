import React from 'react';
import _ from 'lodash';
import withStyles from 'react-jss';

const styles = () => ({
  movie__component_section: {
    marginTop: '1em',
  },
  movie__component_title: {
    fontWeight: 'bold',
  },
  movie__featured_list: {
    listStyleType: 'none',
    display: 'inline-flex',
    margin: '0 auto',
    padding: '0',
  },
  movie__featured_item: {
    paddingRight: '5em',
  },
  movie__featured_name: {
    fontWeight: 'bold',
    margin: '0 auto',
    fontSize: '14px',
  },
  movie__featured_job: {
    margin: '0 auto',
    fontSize: '14px',
  },
});

const MovieDetailFeaturedCrew = ({ classes, directors, stars }) => (
  <div className={classes.movie__component_section}>
    <h3 className={classes.movie__component_title}>Featured by</h3>
    <ol className={classes.movie__featured_list}>
      {
        _.map(directors, director => (
          <li className={classes.movie__featured_item} key={director.label}>
            <p className={classes.movie__featured_name}>{director.label}</p>
            <p className={classes.movie__featured_job}>Director</p>
          </li>
        ))
      }
    </ol>

    <ol className={classes.movie__featured_list}>
      {
        _.map(stars, star => (
          <li className={classes.movie__featured_item} key={star.label}>
            <p className={classes.movie__featured_name}>{star.label}</p>
            <p className={classes.movie__featured_job}>Cast</p>
          </li>
        ))
      }
    </ol>
  </div>
);

export default withStyles(styles)(MovieDetailFeaturedCrew);
