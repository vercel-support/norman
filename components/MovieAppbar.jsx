import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Link from 'next/link';
import React from 'react';
import Router, { withRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { stringify } from 'query-string';
import { Home } from '@material-ui/icons';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '1em',
    cursor: 'pointer',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class MovieAppbar extends React.Component {
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.handleSearchBoxOnChange = this.handleSearchBoxOnChange.bind(this);
    this.handleSearchBoxOnSubmit = this.handleSearchBoxOnSubmit.bind(this);

    this.state = {
      searchString: '',
    };
  }

  handleSearchBoxOnChange(e) {
    this.setState({
      searchString: e.target.value,
    });
  }

  handleSearchBoxOnSubmit(e) {
    e.preventDefault();
    const { searchString } = this.state;
    const queryObject = _.cloneDeep(Router.query);
    queryObject.search = searchString;


    // eslint-disable-next-line no-undef
    window.location.replace(`/?${stringify(queryObject)}`);
  }

  render() {
    const { searchString } = this.state;
    console.log(searchString);

    return (
      <AppBar position="static">
        <Toolbar>
          <Link href="/"><Home className={this.classes.menuButton} /></Link>
          <Link href="/">
            <Typography className={this.classes.title} variant="h6" color="inherit" noWrap>
              Norman
            </Typography>
          </Link>
          <div className={this.classes.grow} />
          <div className={this.classes.search}>
            <div className={this.classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={this.handleSearchBoxOnSubmit}>
              <InputBase
                value={searchString}
                placeholder="Search…"
                onChange={this.handleSearchBoxOnChange}
                classes={{
                  root: this.classes.inputRoot,
                  input: this.classes.inputInput,
                }}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(MovieAppbar));
