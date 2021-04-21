import React from 'react';
import PostForm from './PostForm';

import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const EditPost = ({
  match: {
    params: { id },
  },
}) => {
  useFirestoreConnect([{ collection: 'posts', doc: id }]);
  const posts = useSelector(
    ({ firestore: { data } }) => data.posts && data.posts[id]
  );

  return <PostForm selectedPost={posts} />;
};

export default EditPost;
