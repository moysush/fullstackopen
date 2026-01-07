import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  updateBlog,
} from "./reducers/blogsSlice.js";
import { logout, setToken, setUser } from "./reducers/loginSlice.js";
import { useReducer } from "react";
import Notification from "./components/Notification.jsx";
import { NotificationContext } from "./NotificationContext.js";

function notifReducer(state, action) {
  if (action.type === "setMessage") {
    return action.payload;
  } else if (action.type === "clear") {
    return null;
  }
  throw Error("Unknown action.");
}

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const [notification, notifDispatch] = useReducer(notifReducer, null);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  // clean function for the notification setting with timeout
  const setNotification = (state, action, seconds = 5) => {
    notifDispatch({ type: `${action}`, payload: state });
    setTimeout(() => {
      notifDispatch({ type: "clear", payload: null });
    }, seconds * 1000);
  };

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
      setNotification(
        `${loggedUser.name} successfully logged in`,
        "setMessage",
      );
    } catch (err) {
      setNotification(`invalid username or password; ${err}`, "setMessage");
    }
  };

  // new blog
  const handleCreate = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog, token, user));
      blogFormRef.current.toggleVisibility();
      setNotification(
        `a new blog, ${newBlog.title} by ${newBlog.author} was added successfully`,
        "setMessage",
      );
    } catch (err) {
      setNotification(`error creating a new blog; ${err}`, "setMessage");
    }
  };

  const handleDelete = async (e, blogToDelete) => {
    e.preventDefault();
    // only delete the blog if the condition returns true
    if (window.confirm(`Remove blog: ${blogToDelete.title}?`)) {
      try {
        dispatch(deleteBlog(blogToDelete, token));
        setNotification(
          `blog ${blogToDelete.title} was deleted successfully`,
          "setMessage",
        );
      } catch (err) {
        setNotification(`blog could not be removed ${err}`, "setMessage");
      }
    }
  };

  const handleLikes = async (like) => {
    try {
      dispatch(updateBlog(like, token));
    } catch (err) {
      setNotification(`error updating the blog; ${err}`, "setMessage", 5);
    }
  };

  return (
    <div>
      <NotificationContext.Provider value={notification}>
        <Notification />
      </NotificationContext.Provider>

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
                window.localStorage.removeItem("loggedBlogappUser");
                dispatch(logout());
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
