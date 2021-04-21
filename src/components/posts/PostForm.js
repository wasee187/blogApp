import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Select,
  ListItemText,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { addPost, updatePost } from '../../store';
import { deleteImage } from '../../store/actions/postsAction';

const categories = [
  {
    label: 'Travel',
    value: 'travel',
  },
  {
    label: 'Food',
    value: 'food',
  },
  {
    label: 'Movie',
    value: 'movie',
  },
  {
    label: 'Anime',
    value: 'anime',
  },
];

const PostForm = ({
  history,
  selectedPost,
  classes,
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [error, setError] = useState({
    title: '',
    category: '',
    file: '',
  });
  const [category, setCategory] = useState([]);
  const [editorData, setEditorData] = useState(localStorage.getItem('content'));
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedPost) {
      const { title, body, img, categories } = selectedPost;
      setTitle(title);
      setCategory(categories);
      setFile(img);
      setEditorData(body);
    } else {
      setTitle('');
      setCategory([]);
      setFile(null);
      setEditorData('');
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      setError({
        ...error,
        title: 'Title is required',
      });
      return;
    }
    if (category && category.length === 0) {
      setError({
        ...error,
        category: 'Category is required',
      });
      return;
    }
    if (!file) {
      setError({
        ...error,
        file: 'Image Filed is Required',
      });
      return;
    }

    if (file && !file.url && !/^image\/.+$/.test(file.type)) {
      setError({
        ...error,
        file: 'Only Image file is allowed',
      });
      return;
    }

    if (selectedPost) {
      const postToUpdate = {
        title,
        img: file,
        categories: category,
        body: editorData,
      };
      dispatch(updatePost(postToUpdate, id));
    } else {
      const post = {
        title,
        img: file,
        categories: category,
        body: editorData,
      };
      dispatch(addPost(post));
    }
    //clear local storage
    localStorage.removeItem('content');
    history.push('/');
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const onEditorChangeState = (e, editor) => {
    const data = editor.getData();
    localStorage.setItem('content', data);
    setEditorData(data);
  };

  //handle file for image file
  const handleFile = (evt) => {
    setFile(evt.target.files[0]);
  };
  //handleDeleteImage function
  const handleDeleteImage = (name, id) => {
    dispatch(deleteImage(name, id));
  };
  return (
    <form
      className={(classes.form, 'justify-content-center')}
      onSubmit={handleSubmit}
    >
      <Typography variant='h5' component='h3'>
        {selectedPost ? 'Edit Post' : 'Add Post'}
      </Typography>
      <TextField
        error={!!error.title}
        placeholder='Enter Your blog Title'
        fullWidth
        value={title}
        onChange={handleChange}
        helperText='Title is required'
      />
      <CKEditor
        editor={ClassicEditor}
        data={selectedPost ? selectedPost.body : editorData}
        onChange={onEditorChangeState}
      />
      <Select
        error={!!error.category}
        multiple
        displayEmpty
        onChange={handleCategory}
        value={category}
        renderValue={(selected) =>
          selected && selected.length === 0
            ? 'Select Category'
            : selected.join(', ')
        }
      >
        {categories.map((category) => (
          <MenuItem value={category.value} key={category.label}>
            <ListItemText primary={category.label} />
          </MenuItem>
        ))}
      </Select>

      <br />
      <p className={error}>{error.file && error.file}</p>
      {file && file.url ? (
        <>
          <img
            src={file.url}
            alt={file.name}
            className={classes.imgToEdit}
            lg={6}
            md={6}
            xm={12}
          />
          <br />
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleDeleteImage(file.name, id)}
          >
            Delete
          </Button>
        </>
      ) : (
        <input
          type='file'
          accept='image/*'
          className={classes.input}
          onChange={handleFile}
        />
      )}

      <br />
      <br />
      <Button type='submit' variant='contained' color='primary'>
        {selectedPost ? 'Update Post' : 'Add Post'}
      </Button>
    </form>
  );
};

export default compose(withStyles(styles), withRouter)(PostForm);
