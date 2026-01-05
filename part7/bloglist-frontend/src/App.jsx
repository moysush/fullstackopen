import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationSlice.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const blogFormRef = useRef();

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      const blog = await blogService.create(newBlog, token);
      // concat new blog with the existing blogs fetched initially
      setBlogs(blogs.concat({ ...blog, user })); // show the user's name with user
      // hide form after creating new blog
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog, ${blog.title} by ${blog.author} was added successfully`,
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
        await blogService.remove(blogToDelete, token);
        setBlogs(blogs.filter((blog) => blog !== blogToDelete));
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

  const handleLikes = async (updateLikes) => {
    try {
      const updatedBlog = await blogService.update(updateLikes, token);
      setBlogs(
        blogs.map((blog) =>
          blog.id === updatedBlog.id
            ? { ...updatedBlog, user: blog.user }
            : blog,
        ),
      );
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
