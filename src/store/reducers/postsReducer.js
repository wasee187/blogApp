
const initialState = {
  msg: null,
};
const postsReducers = (state = initialState, action) => {
  switch (action.type) {
    // case 'ADD_POST':
    //   return [...state, action.post];
    // case 'UPDATE_POST':
    //   return state.map((post) =>
    //     post.id === action.id ? (post = action.post) : post
    //   );
    // case 'DELETE_POST':
    //   return state.filter((post) => post.id !== action.id);
    case 'ADD_POST_SUCCESS':
      return {
        ...state,
        msg: 'Post successfully added',
      };
    case 'ADD_POST_ERROR':
      return {
        ...state,
        msg: action.err.message,
      };
    default:
      return state;
  }
};

export default postsReducers;
