import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import { Grid } from '@material-ui/core';

const DashboardIndex = () => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={8} xs={12}>
        <Dashboard />
      </Grid>
      {
        // <Grid item lg={2} md={4} xs={6}>
        //     <Sidebar />
        //   </Grid>
      }
    </Grid>
  );
};
<>
  <Dashboard />
  <Sidebar />
</>;
export default DashboardIndex;
