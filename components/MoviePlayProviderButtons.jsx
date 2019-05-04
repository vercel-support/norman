import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from 'react-jss';
import randomstring from 'randomstring';

const styles = () => ({
  movie__play_provider_button: {
    margin: '0.2em',
    fontSize: '0.9em',
  },
  movie__play_provider_button_selected: {
    margin: '0.2em',
    color: 'white',
    fontSize: '0.9em',
    backgroundColor: 'black',
  },
});

const MoviePlayProviderButtons = ({
  classes, providers, selectedProvider, onClickProviderButton,
}) => providers.map(provider => (
  <Button
    key={randomstring.generate()}
    variant="outlined"
    className={selectedProvider.provider === provider
      ? classes.movie__play_provider_button_selected : classes.movie__play_provider_button}
    onClick={() => onClickProviderButton(provider)}
  >
    {provider}
  </Button>
));

export default withStyles(styles, { withTheme: true })(MoviePlayProviderButtons);
