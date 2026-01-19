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
import { User, UserBlogs } from "./components/User.jsx";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Notification } from "./components/Notification.jsx";
import { NavLink } from "react-router";
import { fetchUsers } from "./reducers/userSlice.js";
import { LogOut } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { getInitial } from "./helper/initial.js";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const blogFormRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
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
      dispatch(setNotification(`${loggedUser.name} successfully logged in`));
    } catch (err) {
      dispatch(setNotification(`invalid username or password; ${err}`));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
    navigate("/");
    dispatch(setNotification(`${user.name} logged out successfully`));
  };

  // new blog
  const handleCreate = async (newBlog) => {
    try {
      await dispatch(createBlog(newBlog, token, user));
      dispatch(
        setNotification(
          `a new blog, ${newBlog.title} by ${newBlog.author} was added successfully`,
        ),
      );
    } catch (err) {
      dispatch(setNotification(`error creating a new blog; ${err}`));
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
          ),
        );
        navigate("/");
      } catch (err) {
        dispatch(setNotification(`blog could not be removed; ${err}`));
      }
    }
  };

  const handleLikes = async (like) => {
    try {
      dispatch(updateBlog(like, token));
    } catch (err) {
      dispatch(setNotification(`error updating the blog; ${err}`));
    }
  };

  const Home = () => {
    return (
      <div className="max-w-4xl mt-14 mx-auto py-8 px-4">
        {!user && (
          <Togglable buttonLabel="Log in">
            <LoginForm userData={handleLogin} />
          </Togglable>
        )}

        {user && (
          <div
            id="blogs"
            className="flex w-full flex-wrap mx-auto justify-center"
          >
            {blogs
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  style={{ textDecoration: "none", color: "indigo" }}
                >
                  <Blog
                    blog={blog}
                    handleDelete={handleDelete}
                    updatelikes={handleLikes}
                    currentUser={user}
                    className=""
                  />
                </Link>
              ))}
            <Togglable buttonLabel="+ Create New" ref={blogFormRef}>
              <BlogForm
                newBlog={handleCreate}
                toggleVisibility={() => blogFormRef.current.toggleVisibility()}
              />
            </Togglable>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      {user && (
        <nav className="flex justify-between items-center border-b border-slate-100 px-6 py-4 bg-white/10 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          {/* left side */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-2xl font-black text-violet-600 cursor-pointer tracking-tighter"
            >
              BlogApp
            </Link>
            <div className="flex space-x-1 text-lg flex gap-2">
              <NavLink
                to="/blogs"
                className="font-semibold tracking-tighter text-slate-600 hover:text-violet-500 font-medium transition-colors"
              >
                Blogs
              </NavLink>
              <NavLink
                to="/users"
                className="font-semibold tracking-tighter text-slate-600 hover:text-violet-500 font-medium transition-colors"
              >
                Users
              </NavLink>
            </div>
          </div>
          {/* right side */}
          <div className="flex items-center space-x-2 bg-slate-200/80 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="flex justify-center items-center gap-1 text-sm text-slate-700 font-semibold hover:text-violet-500">
              <span className="bg-violet-300 h-7 w-7 flex items-center justify-center rounded-full border border-white shadow-sm">
                {getInitial(user.name)}
              </span>
              <span className="hidden md:block">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut size={22} />
            </button>
          </div>
          {/* </div> */}
        </nav>
      )}
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<Home />} />
        <Route path="users" element={<User />} />
        <Route path="users/:userId" element={<UserBlogs />} />
        <Route
          path="blogs/:blogId"
          element={
            <Blog
              handleDelete={handleDelete}
              updatelikes={handleLikes}
              currentUser={user}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
