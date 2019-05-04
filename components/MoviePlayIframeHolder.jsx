import React from 'react';
import withStyles from 'react-jss';

const styles = () => ({
  movie__play_iframe_holder: {
    background: 'url("https://www.autopricemanager.com/img/widget-loader-lg-en.gif") center center no-repeat',
  },
  movie__play_iframe: {
    width: '100%',
    border: 'none',
    height: 'calc((9 / 16) * 100vw)',
    maxHeight: 'calc(100vh - 169px)',
  },
});

const MoviePlayIframeHolder = ({ classes, source, title }) => (
  <div className={classes.movie__play_iframe_holder}>
    <iframe
      src={source}
      allowFullScreen
      className={classes.movie__play_iframe}
      title={title}
    />
  </div>
);

export default withStyles(styles)(MoviePlayIframeHolder);
