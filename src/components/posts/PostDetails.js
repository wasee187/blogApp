import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, withStyles } from '@material-ui/core';
import { parseHtml } from '../../utils';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../store/';
import { useFirestoreConnect } from 'react-redux-firebase';
import Spinner from '../common/Spinner';
import { format } from 'date-fns';

const PostDetails = ({
  match: {
    params: { id },
  },
  history,
  classes,
}) => {
  const dispatch = useDispatch();
  useFirestoreConnect([{ collection: 'posts' }]);
  const posts = useSelector(
    ({ firestore: { ordered } }) => ordered.posts && ordered.posts
  );

  const userUid = useSelector(
    (state) => state.firebase.auth.uid && state.firebase.auth.uid
  );

  const findPost = posts && posts.find((post) => post.id === id);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    history.push('/');
  };
  return (
    <div className={classes.postDetails}>
      {findPost ? (
        <>
          <Typography variant='h5' component='h3'>
            {findPost.title}
          </Typography>
          <img
            className={classes.image}
            src={findPost.img && findPost.img.url}
            alt={findPost.img && findPost.img.name}
          />
          <Typography
            variant='body2'
            dangerouslySetInnerHTML={parseHtml(findPost.body)}
          ></Typography>
          <Typography variant='caption' display='block' align='right'>
            Written by{' '}
            <span className={classes.author}>{findPost.firstName}</span> on{' '}
            {format(
              new Date(findPost.createdAt.seconds * 1000),
              'do MMM, yyyy'
            )}
          </Typography>
          <Typography
            className={classes.categories}
            variant='caption'
            display='block'
            align='left'
          >
            categories : {findPost.categories.join(', ')}
          </Typography>
          {userUid === findPost.authUid && (
            <>
              <Button
                className={classes.detailsButton}
                component={Link}
                to={`/edit/${findPost.id}`}
                variant='contained'
                color='primary'
              >
                Edit
              </Button>
              <Button
                className={classes.detailsButton}
                onClick={() => handleDelete(findPost.id)}
                variant='contained'
                color='primary'
              >
                Delete
              </Button>
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withStyles(styles)(PostDetails);
