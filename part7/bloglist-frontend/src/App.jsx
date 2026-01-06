import { useState, useEffect, useRef } from "react";
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

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const blogFormRef = useRef();
  console.log(blogs);

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
      setToken(userData.token);
    }
  }, []);

  // user login
  const handleLogin = async (userData) => {
    try {
      const loggedUser = await loginService.login(userData);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      setUser(loggedUser);
      setToken(loggedUser.token);
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
        // setBlogs(blogs.filter((blog) => blog !== blogToDelete));
        // dispatch(removeBlog(blogToDelete));
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

  return (
    <div>
      <Notification />

      <h2>Blogs</h2>

      {!user && (
        <Togglable buttonLabel="Log In">
          <LoginForm userData={handleLogin} />
        </Togglable>
      )}

      {user && (
        <div id="blogs">
          <p>
            {user.name} logged in{" "}
            <button
              onClick={() => {
                setUser(window.localStorage.removeItem("loggedBlogappUser"));
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </button>
          </p>
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
};

export default App;
