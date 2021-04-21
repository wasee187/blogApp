import React from 'react';
import { withFormik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authAction';

import styles from './styles';

const Register = ({
  values,
  isSubmitting,
  handleChange,
  handelBlur,
  classes,
}) => {
  return (
    <div className={classes.form}>
      <Typography variant='h5' component='h2'>
        Register
      </Typography>
      <Form noValidate>
        <TextField
          type='text'
          label='First Name'
          name='firstName'
          onChange={handleChange}
          onBlur={handelBlur}
          value={values.firstName}
          fullWidth
        />
        <ErrorMessage
          name='firstName'
          component='div'
          className={classes.error}
        />
        <TextField
          type='text'
          label='Last Name'
          name='lastName'
          onChange={handleChange}
          onBlur={handelBlur}
          value={values.lastName}
          fullWidth
        />
        <ErrorMessage
          name='lastName'
          component='div'
          className={classes.error}
        />
        <TextField
          type='email'
          label='Email'
          name='email'
          onChange={handleChange}
          onBlur={handelBlur}
          value={values.email}
          fullWidth
        />
        <ErrorMessage name='email' component='div' className={classes.error} />
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
        <TextField
          type='password'
          label='Confirm password'
          name='confirmPassword'
          onChange={handleChange}
          onBlur={handelBlur}
          value={values.confirmPassword}
          fullWidth
        />
        <ErrorMessage
          name='confirmPassword'
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
          Register
        </Button>
      </Form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};
export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .min(2, 'First Name must be 2 character')
        .max(10, 'First Name must not be over 10 character')
        .required('First name is required'),

      lastName: yup
        .string()
        .min(2, 'Last Name must be 2 character')
        .max(10, 'Last Name must not be over 10 character')
        .required('last name is required'),

      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),

      password: yup
        .string()
        .min(6, 'Password must be at least 6 character')
        .max(10, 'Password must be bellow 10 character')
        .required('password is required'),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "password don't match")
        .required('confirmed password must be matched'),
    }),

    handleSubmit(values, { props, resetForm, setSubmitting }) {
      setTimeout(() => {
        //Form Submission takes time
        props.signUp(values);
        setSubmitting(false);
      }, 1000);
    },
  })
)(Register);
