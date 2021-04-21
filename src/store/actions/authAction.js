const signIn = (credential) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credential.email, credential.password);
      console.log('Login Success');
    } catch (err) {
      console.log(err.message);
    }
  };
};

const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      firebase.auth().signOut();
      console.log('Sign Out Successfully');
    } catch (err) {
      console.log(err.message);
    }
  };
};

const signUp = (newUser) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      await firestore.set(
        {
          collection: 'users',
          doc: res.user.uid,
        },
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
        }
      );
      console.log('Success');
    } catch (err) {
      console.log(err.message);
    }
  };
};
export { signIn, signOut, signUp };
