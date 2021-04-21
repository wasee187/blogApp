import { useState } from 'react';

const usePostHook = (initialData) => {
  const [posts, setPosts] = useState(initialData);
  return {
    posts,
    addPost(post) {
      setPosts([...posts, post]);
    },
    deletePost(id) {
      setPosts(posts.filter((post) => post.id !== id));
    },
    updatePost(postToUpdate) {
      const postsUpdate = posts.map((post) =>
        post.id === postToUpdate.id ? (post = postToUpdate) : post
      );
      setPosts(postsUpdate);
    },
  };
};

export default usePostHook;
