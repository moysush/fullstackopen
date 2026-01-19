import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { addCommentToBlog } from "../reducers/blogsSlice";
import { useDispatch } from "react-redux";
import { HeartPlus } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { SendHorizonal } from "lucide-react";
import { Trash } from "lucide-react";
import { getInitial } from "../helper/initial";

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
    window.location.reload();
  };
  return (
    <div className="max-w-4xl mx-auto px-4">
      {!blogId ? (
        // for initial blog names we need to prop blog from parents
        <div className="min-w-xs max-w-xs bg-white rounded-xl shadow-sm border border-slate-100 p-7 mb-4 transition-all hover:shadow-md hover:border-violet-300 group">
          <div className="">
            {/* only printing the names */}
            <h3 className="text-lg font-bold text-slate-700 group-hover:text-violet-600 transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-slate-600 italic">{blog.author}</p>
          </div>
        </div>
      ) : blogDetails ? (
        // only show the blog details if blogDetails exist
        <div className="mt-14 bg-white p-8 rounded-lg shadow-xl border border-slate-100">
          <div className="flex justify-between">
            <div className="text-3xl font-bold text-slate-700 tracking-tight mb-3">
              {blogDetails.title}
            </div>
            <div>
              {blogDetails.user.name === currentUser?.name ? (
                <button
                  className="hover:shadow-rose-300 shadow-rose-300 flex-1 font-semibold hover:scale-105 active:scale-95 transition-all bg-rose-600/80 p-2 rounded-lg text-white cursor-pointer shadow"
                  onClick={(e) => handleDelete(e, blogDetails)}
                >
                  <Trash />
                </button>
              ) : null}
            </div>
          </div>
          <p className="font-semibold text-slate-600 mb-1">
            Author: {blogDetails.author}
          </p>
          <div className="flex items-center gap-1 font-semibold text-slate-600">
            <span className="bg-violet-300 h-7 w-7 flex items-center justify-center rounded-full border border-white shadow-sm">
              {getInitial(blogDetails.user.name)}
            </span>
            {blogDetails.user.name}
          </div>
          <div className="w-full flex gap-4 items-center my-3 text-center">
            <button
              onClick={handleLikes}
              className="flex justify-center items-center gap-2 hover:bg-violet-700 hover:shadow-violet-300 shadow-violet-300 flex-1 font-semibold hover:scale-105 active:scale-95 transition-all bg-violet-600/80 p-2 rounded-lg text-white cursor-pointer shadow"
            >
              <HeartPlus />
              Like ({blogDetails.likes})
            </button>
            <a
              href={blogDetails.url}
              target="_blank"
              className="flex justify-center items-center gap-2 hover:shadow-state-300 shadow flex-1 font-semibold hover:scale-105 active:scale-95 transition-all bg-slate-200/80 text-slate-700 p-2 border border-slate-200 rounded-lg"
            >
              <ExternalLink />
              Open Link
            </a>
          </div>
          <hr className="my-4 border-slate-200" />
          <div className="w-full space-y-3">
            <h4 className="text-xl font-semibold text-slate-700">
              Comments {`(${blogDetails.comments.length})`}
            </h4>
            <form
              className="flex gap-4"
              onSubmit={(e) => addComment(e, comment)}
            >
              <input
                className="basis-3/4 text-sm focus:outline-none border border-slate-100 hover:border-violet-300 focus:border-violet-700 shadow rounded-lg p-2"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a thoughtful comment..."
              />
              <button
                className="flex justify-center items-center gap-2 hover:bg-violet-700 basis-1/4 font-semibold bg-violet-600/80 text-white rounded-lg cursor-pointer shadow shadow-violet-300 hover:scale-105 transition-all"
                type="submit"
              >
                <SendHorizonal size={22} />
                Post
              </button>
            </form>
            <div>
              {blogDetails.comments.length === 0 ? (
                <p className="w-full rounded-lg bg-slate-100 p-2">
                  There are no comments yet...
                </p>
              ) : (
                <ul className="space-y-4 mt-6">
                  {blogDetails.comments.map((comment, index) => {
                    return (
                      <li
                        className="w-full rounded-lg bg-slate-100 p-2"
                        key={`${comment}-${index}`}
                      >
                        <span className="flex items-center gap-1 mb-2 font-semibold">
                          <span className="bg-violet-300 h-7 w-7 flex items-center justify-center rounded-full border border-white shadow-sm">
                            {getInitial("annonymous")}
                          </span>
                          annonymous
                        </span>
                        <p>{comment}</p>
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
