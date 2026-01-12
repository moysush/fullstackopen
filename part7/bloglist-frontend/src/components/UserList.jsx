import { useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { fetchUsers } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const UserDetails = () => {
  // all the users from the redux store for comparison
  const users = useSelector((state) => state.users);
  // user id from the url
  const { userId } = useParams();
  // finding the user
  const user = users?.find((user) => user.id === userId.toString());

  if (!user) {
    return "User not found";
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User list</h2>
      <table>
        <thead>
          <tr>
            <th>User Names</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
