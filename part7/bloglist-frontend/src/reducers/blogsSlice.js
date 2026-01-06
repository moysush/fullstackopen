import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlog: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    removeBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload.id),
    updateLike: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...action.payload, user: blog.user }
          : blog,
      );
    },
  },
});

export const { getBlog, addBlog, removeBlog, updateLike } = blogsSlice.actions;

export const fetchBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((data) => {
      dispatch(getBlog(data));
    });
  };
};

export const createBlog = (blog, token, user) => {
  return (dispatch) => {
    blogService.create(blog, token).then((data) => {
      dispatch(addBlog({ ...data, user }));
    });
  };
};

export const deleteBlog = (blog, token) => {
  return (dispatch) => {
    // since backend does not return anything we need to pass the blog directly
    blogService.remove(blog, token).then(() => dispatch(removeBlog(blog)));
  };
};

export const updateBlog = (blog, token) => {
  return (dispatch) => {
    blogService.update(blog, token).then((data) => dispatch(updateLike(data)));
  };
};

export default blogsSlice.reducer;
