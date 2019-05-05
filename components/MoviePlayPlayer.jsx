/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import _ from 'lodash';
import withStyles from 'react-jss';

const styles = () => ({
  movie__play_player_holder: {
    background: 'url("https://www.autopricemanager.com/img/widget-loader-lg-en.gif") center center no-repeat',
  },
  movie__play_player: {
    width: '100%',
    border: 'none',
    height: 'calc((9 / 16) * 100vw)',
    maxHeight: 'calc(100vh - 169px)',
  },
});

const shouldRenderIframe = source => source.indexOf('google') === -1;

const Tracks = ({ subtitles }) => {
  const defaultSubtitle = _.head(subtitles);
  const renderedSubtitles = _.tail(subtitles);

  return (
    <React.Fragment>
      {
        defaultSubtitle
          ? (
            <track
              label={defaultSubtitle.label}
              kind={defaultSubtitle.kind}
              srcLang={defaultSubtitle.srcLang}
              src={`http://localhost:3000?redirectUrl=${defaultSubtitle.file}`}
              default
            />
          ) : ''
      }

      {
        renderedSubtitles.map(subtitle => (
          <track
            key={subtitle.file}
            label={subtitle.label}
            kind={subtitle.kind}
            srcLang={subtitle.srcLang}
            src={`http://localhost:3000?redirectUrl=${subtitle.file}`}
          />
        ))
      }
    </React.Fragment>
  );
};

const VideoPlayer = ({
  classes, source, title, subtitles,
}) => {
  return (
    <div className={classes.movie__play_player_holder}>
      <video
        width="100%"
        name={title}
        controls
        autoPlay
        className={`${classes.movie__play_player} video-js`}
        preload="auto"
      >
        <source src={source} type="video/mp4" />
        <Tracks subtitles={subtitles} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
};

const IframePlayer = ({ classes, source, title }) => (
  <div className={classes.movie__play_player_holder}>
    <iframe
      src={source}
      allowFullScreen
      className={classes.movie__play_player}
      title={title}
    />
  </div>
);

const MoviePlayPlayer = ({
  classes, source, title, subtitles,
}) => (
  <React.Fragment>
    {
        shouldRenderIframe(source)
          ? (
            <IframePlayer
              classes={classes}
              source={source}
              title={title}
            />
          ) : (
            <VideoPlayer
              classes={classes}
              source={source}
              subtitles={subtitles}
              title={title}
            />
          )
      }
  </React.Fragment>
);

export default withStyles(styles)(MoviePlayPlayer);
