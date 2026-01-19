import { Link } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getInitial } from "../helper/initial";

export const UserBlogs = () => {
  // all the users from the redux store for comparison
  const users = useSelector((state) => state.users);
  // user id from the url
  const { userId } = useParams();
  // finding the user
  const user = users?.find((user) => user.id === userId);

  if (!user) {
    return (
      <div className="max-w-4xl mt-14 mx-auto text-center">
        <h2 className="text-2xl font-black text-violet-500 animate-pulse">
          Loading...
        </h2>
      </div>
    );
  }

  return user ? (
    <div className="max-w-4xl mx-auto my-14 px-4 space-y-4">
      <h2 className="font-black text-3xl tracking-tight text-slate-700">
        {user.name}
      </h2>
      <h4 className="mt-3 uppercase text-slate-600 font-bold tracking-tight text-sm">
        Added blogs
      </h4>
      {user.blogs.map((blog) => {
        return (
          <li
            className="list-none backdrop-blur-md text-slate-700 w-full bg-white p-4 rounded-lg shadow-md hover:shadow-violet-300 hover:text-violet-600 font-semibold border border-slate-100 hover:border-violet-300"
            key={blog.id}
          >
            {blog.title}
          </li>
        );
      })}
    </div>
  ) : null;
};

export const User = () => {
  const users = useSelector((state) => state.users);

  if (!users) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-400 font-bold animate-pulse">
        Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 space-y-4 px-4">
      <h2 className="text-3xl font-black tracking-tight text-slate-700">
        Community Directory
      </h2>
      <table className="overflow-hidden w-full text-left border-collapse bg-white p-4 shadow-xl backdrop-blur-md rounded-2xl">
        <thead>
          <tr className="bg-violet-600/80 text-white">
            <th className="text-sm px-6 py-4 uppercase backdrop-blur-md tracking-widest">
              User Names
            </th>
            <th className="text-sm px-6 py-4 uppercase backdrop-blur-md tracking-widest">
              Blogs Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700 font-semibold transition-all">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-violet-50/50 transition-all group"
            >
              <td className="text-slate-600 px-6 py-4 group-hover:text-violet-700">
                <Link
                  to={`/users/${user.id}`}
                  className="flex gap-1 items-center"
                >
                  <span className="bg-violet-300 h-7 w-7 flex items-center justify-center rounded-full border border-white shadow-sm">
                    {getInitial(user.name)}
                  </span>
                  {user.name}
                </Link>
              </td>
              <td className="text-slate-600 px-6 py-4 group-hover:text-violet-700">
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
