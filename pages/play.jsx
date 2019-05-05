import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import getMoviePlay from '../api/get-movie-play';
import MovieAppbar from '../components/MovieAppbar';
import MoviePlayPlayer from '../components/MoviePlayPlayer';
import MoviePlayProviderButtons from '../components/MoviePlayProviderButtons';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      width: 1280,
      textAlign: 'unset',
    },
    textAlign: 'center',
    display: 'inline-block',
  },
  movie__play_provider_selection: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '27em',
  },
  movie__play_provider_configuration_button: {
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      borderColor: 'white',
    },
  },
});

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
};

class MoviePlay extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.theme = props.theme;
    this.fullScreen = props.fullScreen;
    this.moviePlay = props.moviePlay;
    this.playItems = props.moviePlay.playList.playItems;
    this.subtitles = props.moviePlay.playList.subtitles;

    this.qualities = _.keys(this.playItems).sort((a, b) => a.replace(/\D/g, '') - b.replace(/\D/g, ''));
    this.onChangeQuality = this.onChangeQuality.bind(this);
    this.handleQualityIndex = this.handleQualityIndex.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.onClickProviderButton = this.onClickProviderButton.bind(this);

    const selectedQuality = _.last(this.qualities);
    const selectedProvider = _.get(this.playItems, `${selectedQuality}.[0]`);

    this.state = {
      selectedProvider,
      selectedQuality: _.last(this.qualities),
      selectedQualityIndex: this.qualities.length - 1,
      togglePopupState: false,
    };
  }

  onChangeQuality(event, selectedQualityIndex) {
    this.setState({
      selectedQualityIndex,
      selectedQuality: this.qualities[selectedQualityIndex],
    });
  }

  onClickProviderButton(provider) {
    const { selectedQuality } = this.state;

    const selectedQualityPlayItem = this.playItems[selectedQuality];
    const selectedProvider = _.find(selectedQualityPlayItem, { provider });

    this.setState({
      selectedProvider,
      togglePopupState: false,
    });
  }

  // Not sure whether this is needed or not
  handleQualityIndex(selectedQualityIndex) {
    this.setState({ selectedQualityIndex });
  }

  handleTogglePopup(open) {
    this.setState({
      togglePopupState: open,
    });
  }

  render() {
    const { selectedProvider, selectedQualityIndex, togglePopupState } = this.state;

    return (
      <React.Fragment>
        <MovieAppbar />
        <MoviePlayPlayer
          source={selectedProvider.file}
          title={this.moviePlay.name}
          subtitles={this.subtitles}
        />
        <div className={this.classes.movie__play_provider_selection}>
          <Dialog
            fullScreen={this.fullScreen}
            open={togglePopupState}
            onClose={() => this.handleTogglePopup(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">Choose quality and server</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div tabIndex={0} role="button">
                  <AppBar position="static" color="default">
                    <Tabs
                      value={selectedQualityIndex}
                      onChange={this.onChangeQuality}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      {
                        this.qualities.map(quality => <Tab key={quality} label={quality} />)
                      }
                    </Tabs>
                  </AppBar>
                  <SwipeableViews
                    axis={this.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={selectedQualityIndex}
                    onChangeIndex={this.handleQualityIndex}
                  >
                    {
                      _.map(this.qualities, (quality) => {
                        const playitems = this.playItems[quality];

                        const providers = _.map(playitems, 'provider');

                        return (
                          <TabContainer key={quality} dir={this.theme.direction}>
                            <MoviePlayProviderButtons
                              providers={providers}
                              selectedProvider={selectedProvider}
                              onClickProviderButton={this.onClickProviderButton}
                            />
                          </TabContainer>
                        );
                      })
                    }
                  </SwipeableViews>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleTogglePopup(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Grid container justify="center">
          <Grid container className={this.classes.container} alignItems="center" justify="center">
            <h2>{this.moviePlay.name}</h2>
            <Button
              variant="outlined"
              color="primary"
              className={this.classes.movie__play_provider_configuration_button}
              onClick={() => this.handleTogglePopup(true)}
            >
              Configure Movie Provider
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

MoviePlay.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const moviePlay = await getMoviePlay(slug);

  return { moviePlay };
};

export default withStyles(styles, { withTheme: true })(MoviePlay);
