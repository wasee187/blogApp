const styles = {
  form: {
    width: '600px',
    margin: '0 auto',
  },
  toolbar: {
    display: 'flex',
    marginTop: '10px',
  },
  editorActiveBtn: {
    backgroundColor: '#00072b',
    color: '#fff',
  },
  post: {
    padding: '10px',
    margin: '10px 0',
  },
  button: {
    marginTop: '10px',
  },
  postDetails: {
    '& *': {
      marginBottom: '10px',
    },
  },
  detailsButton: {
    marginRight: '10px',
  },
  categories: {
    fontStyle: 'italic',
  },
  author: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    maxWidth: '1280px',
    minHeight: '600px',
    margin: '0 auto',
  },
  input: {
    "&[type='file]": {
      marginTop: '10px',
      fontSize: '20px',
    },
  },
  error: {
    color: 'red',
  },
  imgToEdit: {
    maxWidth: '200px',
    minHeight: '150px',
    height: '300px',
  },
};

export default styles;
