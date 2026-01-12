import { useEffect } from "react";
import userService from "../services/users";
import { useState } from "react";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((data) => setUsers(data));
  }, []);
  console.log(users);
  return (
    <div>
      <h2>User list</h2>
      <table>
        <tr>
          <th>User Names</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
