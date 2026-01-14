import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { addCommentToBlog } from "../reducers/blogsSlice";
import { useDispatch } from "react-redux";

export const Blog = ({ blog, handleDelete, updatelikes, currentUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const { blogId } = useParams();
  const blogDetails = blogs.find((blog) => blog.id === blogId);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleLikes = (e) => {
    e.preventDefault();

    updatelikes({
      ...blogDetails,
      likes: blogDetails.likes + 1,
    });
  };

  const addComment = async (e) => {
    e.preventDefault();

    await dispatch(addCommentToBlog(blogId, comment));
    setComment("");
  };
  return (
    <div className="dot">
      {!blogId ? (
        // for initial blog names we need to prop blog from parents
        <div>
          {/* only printing the names */}
          {blog.title} - {blog.author}
        </div>
      ) : blogDetails ? (
        // only show the blog details if blogDetails exist
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
            <form onSubmit={(e) => addComment(e, comment)}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">Add Comment</button>
            </form>
            <div>
              {blogDetails.comments.length === 0 ? (
                <p>There are no comments yet...</p>
              ) : (
                <ul>
                  {blogDetails.comments.map((comment, index) => {
                    return (
                      <li
                        key={`${comment}-${index}`}
                        style={{ listStyle: "disc" }}
                      >
                        {comment}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
