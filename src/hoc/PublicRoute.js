import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';

const PublicRoute = ({ component: Component, ...rest }) => {
  //checking user is authenticated or not
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoaded(auth) &&
        (auth.uid ? <Redirect to='/' /> : <Component {...props} />)
      }
    />
  );
};

export default PublicRoute;
