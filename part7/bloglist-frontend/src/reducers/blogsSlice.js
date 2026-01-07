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
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch(getBlog(data));
  };
};

export const createBlog = (blog, token, user) => {
  return async (dispatch) => {
    const data = await blogService.create(blog, token);
    dispatch(addBlog({ ...data, user }));
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    // since backend does not return anything we need to pass the blog directly
    await blogService.remove(blog, token);
    dispatch(removeBlog(blog));
  };
};

export const updateBlog = (blog, token) => {
  return async (dispatch) => {
    const data = await blogService.update(blog, token);
    dispatch(updateLike(data));
  };
};

export default blogsSlice.reducer;
