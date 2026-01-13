import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const Blog = ({ blog, handleDelete, updatelikes, currentUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const { blogId } = useParams();
  const blogDetails = blogs.find((blog) => blog.id === blogId);
  // console.log(blogDetails);

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
          <div
            style={{
              fontSize: "20px",
              margin: "0 0 6px 0",
              fontWeight: "bold",
            }}
          >
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
          <div>
            <h4>Comments</h4>
            {blogDetails.comments.length === 0 ? (
              <p>There are no comments yet...</p>
            ) : (
              <ul>
                {blogDetails.comments.map((comment) => {
                  return (
                    <li key={comment} style={{ listStyle: "disc" }}>
                      {comment}
                    </li>
                  );
                })}
                <li></li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
