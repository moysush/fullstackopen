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
    updateComment: (state, action) =>
      state.map((blog) =>
        blog.id === action.payload.id ? { ...action.payload } : blog,
      ),
  },
});

export const { getBlog, addBlog, removeBlog, updateLike, updateComment } =
  blogsSlice.actions;

export const fetchBlogs = () => {
  return (dispatch) => {
    return blogService.getAll().then((data) => {
      dispatch(getBlog(data));
    });
  };
};

export const createBlog = (blog, token, user) => {
  return (dispatch) => {
    return blogService.create(blog, token).then((data) => {
      dispatch(addBlog({ ...data, user }));
    });
  };
};

export const addCommentToBlog = (blogId, comment) => {
  return (dispatch) => {
    return blogService
      .createComment(blogId, { comment: comment })
      .then((data) => dispatch(updateComment(data)));
    // server sends back the whole blog with comments thats why we can dispatch data as a whole
  };
};

export const deleteBlog = (blog, token) => {
  return (dispatch) => {
    // since backend does not return anything we need to pass the blog directly
    return blogService
      .remove(blog, token)
      .then(() => dispatch(removeBlog(blog)));
  };
};

export const updateBlog = (blog, token) => {
  return (dispatch) => {
    return blogService
      .update(blog, token)
      .then((data) => dispatch(updateLike(data)));
  };
};

export default blogsSlice.reducer;
