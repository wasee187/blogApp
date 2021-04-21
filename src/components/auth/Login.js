import React from 'react';
import { withFormik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, withStyles } from '@material-ui/core';
import styles from './styles';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { signIn } from '../../store/actions/authAction';

const Login = ({ values, isSubmitting, handleChange, handelBlur, classes }) => {
  return (
    <React.Fragment>
      <div className={classes.form}>
        <Typography variant='h5' component='h2'>
          Login
        </Typography>
        <Form noValidate>
          <TextField
            type='email'
            label='Email'
            name='email'
            onChange={handleChange}
            onBlur={handelBlur}
            value={values.email}
            fullWidth
          />
          <ErrorMessage
            name='email'
            component='div'
            className={classes.error}
          />
          <TextField
            type='password'
            label='Password'
            name='password'
            onChange={handleChange}
            onBlur={handelBlur}
            value={values.password}
            fullWidth
          />
          <ErrorMessage
            name='password'
            component='div'
            className={classes.error}
          />

          <Button
            className={classes.button}
            disabled={isSubmitting}
            type='submit'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

//mapdispatchtoprops method
const mapDispathToProps = (dispatch) => {
  return {
    signIn: (credential) => dispatch(signIn(credential)),
  };
};
export default compose(
  withStyles(styles),
  connect(null, mapDispathToProps),
  withFormik({
    mapPropsToValues() {
      return {
        email: '',
        password: '',
      };
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),

      password: yup
        .string()
        .min(6, 'Password must be at least 6 character')
        .max(10, 'Password must be bellow 10 character')
        .required('password is required'),
    }),

    handleSubmit(values, { props, resetForm, setSubmitting }) {
      //signIn dispatch

      props.signIn(values);
      setSubmitting(false);
      props.history.push('/');
    },
  })
)(Login);
