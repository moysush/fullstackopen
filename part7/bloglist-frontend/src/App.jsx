import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import Notification from "./components/Notification.jsx";
import { NotificationContext } from "./NotificationContext.js";
import { useNotification } from "./hooks/useNotification.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "./services/blogs.js";
import { useLogin } from "./hooks/useLogin.js";

const App = () => {
  const [notification, setNotification] = useNotification();
  const [login, setLogin, setLogout] = useLogin();
  const blogFormRef = useRef();

  // initiate queryClient
  const queryClient = useQueryClient();

  // fetchign the blogs
  const {
    data: blogs = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  });

  // create new blog in the server
  const newBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.create(newBlog, login.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) =>
      setNotification(`error creating a new blog; ${err}`, "setMessage"),
  });

  // remove a blog from the server
  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog, login.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) =>
      setNotification(`blog could not be removed ${err}`, "setMessage"),
  });

  // modify a blog with like in the server
  const likeBlogMutation = useMutation({
    mutationFn: (blog) => blogService.update(blog, login.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) =>
      setNotification(`error updating the blog; ${err}`, "setMessage"),
  });

  // initial app loading
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setLogin(userData);
    }
  }, []);

  // user login button
  const handleLogin = async (userData) => {
    try {
      const loggedUser = await loginService.login(userData);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      setLogin(loggedUser);
      setNotification(
        `${loggedUser.name} successfully logged in`,
        "setMessage",
      );
    } catch (err) {
      setNotification(`invalid username or password; ${err}`, "setMessage");
    }
  };

  // logout button
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setLogout();
    queryClient.clear();
  };

  // new blog button
  const handleCreate = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    blogFormRef.current.toggleVisibility();
    setNotification(
      `a new blog, ${newBlog.title} by ${newBlog.author} was added successfully`,
      "setMessage",
    );
  };

  // delete blog button
  const handleDelete = async (e, blogToDelete) => {
    e.preventDefault();
    // only delete the blog if the condition returns true
    if (window.confirm(`Remove blog: ${blogToDelete.title}?`)) {
      deleteBlogMutation.mutate(blogToDelete);
      setNotification(
        `blog ${blogToDelete.title} was deleted successfully`,
        "setMessage",
      );
    }
  };

  // update likes button
  const handleLikes = async (like) => {
    likeBlogMutation.mutate(like);
  };

  return (
    <div>
      <NotificationContext.Provider value={notification}>
        <Notification />
      </NotificationContext.Provider>

      <h2>Blogs</h2>

      {!login.user && (
        <Togglable buttonLabel="Log In">
          <LoginForm userData={handleLogin} />
        </Togglable>
      )}

      {login.user && (
        <div id="blogs">
          <p>
            {login.user.name} logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          {isPending && <span>Loading...</span>}
          {error && <span>Opps! {error.message}</span>}
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleDelete={handleDelete}
                updatelikes={handleLikes}
                currentUser={login.user}
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
