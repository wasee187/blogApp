import { toastr } from 'react-redux-toastr';
import { v4 as uuidv4 } from 'uuid';

const addPost = (post) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const authUid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const imageName = uuidv4();
    const filesPath = `images/${authUid}`;
    const metaData = {
      name: imageName,
    };
    //store data in firebase/firestore
    try {
      //upload file
      const uploadedFile = await firebase.uploadFile(
        filesPath,
        post.img,
        null,
        metaData
      );
      //get download link
      const downloadedURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      await firestore.add(
        { collection: 'posts' },
        {
          ...post,
          img: {
            name: imageName,
            url: downloadedURL,
          },
          firstName: profile.firstName,
          authUid,
          createdAt: new Date(),
        }
      );

      toastr.success('Success', 'Post successfully added');
    } catch (err) {
      toastr.error('Error!!', 'Post adding failed');
    }
  };
};
const updatePost = (post, id) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const imageName = uuidv4();
    const authUid = getState().firebase.auth.uid;
    let downloadedURL;
    const filesPath = `images/${authUid}`;

    //Delete image and add new image
    try {
      if (!post.img.url) {
        const metaData = {
          name: imageName,
        };
        const uploadedFile = await firebase.uploadFile(
          filesPath,
          post.img,
          null,
          metaData
        );
        //getting download link
        downloadedURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      }

      await firestore.update(
        { collection: 'posts', doc: id },
        {
          ...post,
          img: {
            name: downloadedURL ? imageName : post.img.name,
            url: downloadedURL ? downloadedURL : post.img.url,
          },
        }
      );
      toastr.success('Success', 'Post successfully updated');
    } catch (err) {
      toastr.error('Error!!', 'Update unsuccessful');
    }
  };
};
const deletePost = (id) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      //deleting data from firestore
      await firestore.delete({
        collection: 'posts',
        doc: id,
      });
      toastr.warning('Success', 'Post successfully deleted');
    } catch (err) {
      toastr.error('Error!!', 'Delete post failed');
    }
  };
};
const deleteImage = (imgName, docId) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const authUid = getState().firebase.auth.uid;
    try {
      //Delete Image from store
      await firebase.deleteFile(`images/${authUid}/${imgName}`);
      await firestore.update(
        {
          collection: 'posts',
          doc: docId,
        },
        { img: null }
      );
      toastr.success('!!Success', 'Image is deleted');
    } catch (err) {
      toastr.error('!!Error', 'Image not deleted');
    }

    //delete from reference post
  };
};
export { addPost, updatePost, deletePost, deleteImage };
