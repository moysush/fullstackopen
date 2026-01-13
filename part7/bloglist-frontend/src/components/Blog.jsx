import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export const Blog = ({ blog, handleDelete, updatelikes, currentUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const { blogId } = useParams();
  const blogDetails = blogs.find((blog) => blog.id === blogId);
  const navigate = useNavigate();

  // if (!blogDetails) {
  //   navigate("/blogs");
  //   return null;
  // }

  // liking functionality
  const handleLikes = (e) => {
    e.preventDefault();

    updatelikes({
      ...blogDetails,
      likes: blogDetails.likes + 1,
    });
  };
  return (
    <div className="dot">
      {!blogId ? (
        // for initial blog names we need to prop blog from parents
        <div>
          {blog.title} - {blog.author}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "24px", margin: "0 0 6px 0" }}>
            {blogDetails.title} - {blogDetails.author}
          </div>
          <div>{blogDetails.url}</div>
          <div>
            Likes: {blogDetails.likes}{" "}
            <button onClick={handleLikes}>Like</button>
          </div>
          <div>{blogDetails.user.name}</div>
          <div>
            {blogDetails.user.name === currentUser?.name ? (
              <button onClick={(e) => handleDelete(e, blogDetails)}>
                Remove
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
