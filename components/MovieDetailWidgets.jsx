import Link from 'next/link';
import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import orange from '@material-ui/core/colors/orange';
import withStyles from 'react-jss';
import { PlayArrow } from '@material-ui/icons';

const styles = () => ({
  movie__widget: {
    display: 'inline-flex',
  },
  movie__widget_label: {
    margin: '3em 1em',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  movie__play_trailer_icon: {
    '&:hover': {
      opacity: '0.5',
    },
    display: 'inline-block',
    padding: '2.8em 0.5em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'opacity .3s ease',
  },
  movie__play_trailer_icon_label: {
    display: 'inline-block',
    position: 'relative',
    bottom: '0.3em',
  },
  movie__pie_chart: {
    display: 'inline-block',
    width: '6em',
  },
});

const MovieDetailFeaturedCrew = ({
  classes, ratingValue, trailerUrl, slug,
}) => (
  <div className={classes.movie__widget}>
    <ReactMinimalPieChart
      className={classes.movie__pie_chart}
      data={[
        {
          value: Number(ratingValue || 0),
          color: orange[500],
        }]}
      totalValue={10}
      lineWidth={20}
      label
      labelStyle={{
        fontSize: '40px',
        fontFamily: 'sans-serif',
      }}
      labelPosition={0}
      radius={50}
    />
    <span className={classes.movie__widget_label}>User score</span>
    {
      /* Display trailer url if exists
          Some url filled with empty embed utube url */
      (trailerUrl && trailerUrl !== 'https://www.youtube.com/embed/') ? (
        <a href={trailerUrl} className={classes.movie__play_trailer_icon}>
          <PlayArrow />
          <div className={classes.movie__play_trailer_icon_label}>Play trailer</div>
        </a>
      ) : ''
    }

    <Link as={`/${slug}/play`} href={`/play/${slug}`}>
      <a className={classes.movie__play_trailer_icon}>
        <PlayArrow />
        <div className={classes.movie__play_trailer_icon_label}>Play Movie</div>
      </a>
    </Link>
  </div>
);

export default withStyles(styles)(MovieDetailFeaturedCrew);
