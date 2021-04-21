import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from './components/header_footer';
import { NotFound } from './components/pages';
import { Register, Login } from './components/auth';
import DashboardIndex from './components/dashboard';
import { AddPost, EditPost, PostDetails } from './components/posts';
import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <PrivateRoute path='/' exact component={DashboardIndex} />
            <PublicRoute path='/register' component={Register} />
            <PublicRoute path='/login' component={Login} />

            <PrivateRoute path='/add' component={AddPost} />
            <PrivateRoute path='/edit/:id' component={EditPost} />
            <PrivateRoute path='/post/:id' component={PostDetails} />

            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
