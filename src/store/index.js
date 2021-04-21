import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import {
  firestoreReducer,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore';

import { addPost, updatePost, deletePost } from './actions/postsAction';
import postsReducers from './reducers/postsReducer';
import firebase from '../firebase/fbconfig';
import { reducer as toastrReducer } from 'react-redux-toastr';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for redux devtool configure

const store = createStore(
  combineReducers({
    posts: postsReducers,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    toastr: toastrReducer,
  }),
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      })
    ),
    reduxFirestore(firebase)
  )
);

export { store, addPost, updatePost, deletePost };
