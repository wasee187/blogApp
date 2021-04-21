import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import styles from './styles';

const Footer = ({ classes }) => {
  return (
    <Typography
      align='center'
      variant='caption'
      paragraph={true}
      className={classes.footer}
    >
      &copy; Wasee Sarwar | All Rights Reserved
    </Typography>
  );
};

export default withStyles(styles)(Footer);
