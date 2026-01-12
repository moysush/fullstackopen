import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationSlice.js";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  updateBlog,
} from "./reducers/blogsSlice.js";
import { logout, setToken, setUser } from "./reducers/loginSlice.js";
import { Routes } from "react-router";
import { Route } from "react-router";
import { UserDetails, UserList } from "./components/UserList.jsx";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const blogFormRef = useRef();

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData));
      dispatch(setToken(userData.token));
    }
  }, [dispatch]);

  // user login
  const handleLogin = async (userData) => {
    try {
      const loggedUser = await loginService.login(userData);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      dispatch(setUser(loggedUser));
      dispatch(setToken(loggedUser.token));
      dispatch(setNotification(`${loggedUser.name} successfully logged in`, 5));
    } catch (err) {
      dispatch(setNotification(`invalid username or password; ${err}`, 5));
    }
  };

  // new blog
  const handleCreate = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog, token, user));
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog, ${newBlog.title} by ${newBlog.author} was added successfully`,
          5,
        ),
      );
    } catch (err) {
      dispatch(setNotification(`error creating a new blog; ${err}`, 5));
    }
  };

  const handleDelete = async (e, blogToDelete) => {
    e.preventDefault();
    // only delete the blog if the condition returns true
    if (window.confirm(`Remove blog: ${blogToDelete.title}?`)) {
      try {
        dispatch(deleteBlog(blogToDelete, token));
        dispatch(
          setNotification(
            `blog ${blogToDelete.title} was deleted successfully`,
            5,
          ),
        );
      } catch (err) {
        dispatch(setNotification(`blog could not be removed ${err}`, 5));
      }
    }
  };

  const handleLikes = async (like) => {
    try {
      dispatch(updateBlog(like, token));
    } catch (err) {
      dispatch(setNotification(`error updating the blog; ${err}`, 5));
    }
  };

  const Notification = () => (
    <div>
      {notification && (
        <div
          className={
            notification.includes("successfully") ? "success" : "error"
          }
        >
          {notification}
        </div>
      )}
    </div>
  );

  const Home = () => (
    <div>
      <Notification />

      {!user && (
        <Togglable buttonLabel="Log In">
          <LoginForm userData={handleLogin} />
        </Togglable>
      )}

      {user && (
        <div id="blogs">
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleDelete={handleDelete}
                updatelikes={handleLikes}
                currentUser={user}
              />
            ))}
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm newBlog={handleCreate} />
          </Togglable>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>
      {user && (
        <p>
          {" "}
          {user.name} logged in{" "}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </p>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
