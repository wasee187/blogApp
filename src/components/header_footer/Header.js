import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Link,
  withStyles,
} from '@material-ui/core';
import RegisterLinks from './RegisterLinks';
import LoginLinks from './LoginLinks';
import { Link as LinkRouter } from 'react-router-dom';
import styles from './styles';
import { useSelector } from 'react-redux';

const Header = ({ classes }) => {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={classes.toolbar}>
          <Link
            to='/'
            variant='h6'
            color='inherit'
            underline='none'
            component={LinkRouter}
          >
            BlogApp
          </Link>
          <div>{auth.uid ? <LoginLinks /> : <RegisterLinks />}</div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
