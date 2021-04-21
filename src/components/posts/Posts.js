import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import PostSummary from './PostSummary';
import styles from './styles';
import Spinner from '../common/Spinner';

import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const Posts = ({ classes }) => {
  useFirestoreConnect([{ collection: 'posts' }]);

  const posts = useSelector(
    ({ firestore: { ordered } }) => ordered.posts && ordered.posts
  );
  return (
    <>
      {posts ? (
        posts.length > 0 ? (
          posts.map((post) => (
            <Paper className={classes.post} elevation={4} key={post.id}>
              <PostSummary post={post} />
            </Paper>
          ))
        ) : (
          <p>No Post is available</p>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withStyles(styles)(Posts);
