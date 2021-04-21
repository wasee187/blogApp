import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import App from './App';
import { store } from './store';
import firebase, { rrfConfig } from './firebase/fbconfig';
import './index.css';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

//react redux firebase props
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ReduxToastr
          timeOut={2000}
          newestOnTop={true}
          preventDuplicates
          position='bottom-right'
          getState={(state) => state.toastr} // This is the default
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          progressBar
          closeOnToastrClick
        />
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,

    document.getElementById('root')
  );
});
