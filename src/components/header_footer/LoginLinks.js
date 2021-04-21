import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Fab, withStyles } from '@material-ui/core';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const Link = withStyles(styles)(
  React.forwardRef((props, ref) => {
    return (
      <NavLink
        activeClassName={props.classes.activeNav}
        innerRef={ref}
        {...props}
      />
    );
  })
);
const LoginLinks = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.firebase.profile && state.firebase.profile
  );
  return (
    <>
      <Button component={Link} to='/add' color='inherit'>
        Add Post
      </Button>
      <Button color='inherit' onClick={() => dispatch(signOut())}>
        Log Out
      </Button>
      <Fab size='medium' variant='round' color='primary'>
        {user.initials ? user.initials : ''}
      </Fab>
    </>
  );
};

export default LoginLinks;
