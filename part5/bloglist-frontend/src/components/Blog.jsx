import { useState } from "react"

const Blog = ({ blog, handleDelete, updatelikes, currentUser }) => {
  const [view, setView] = useState(false)

  const handleLikes = (e) => {
    e.preventDefault()

    updatelikes({
      ...blog,
      likes: blog.likes + 1
    })

    // const handleDelete = (e) => {
    //   e.preventDefault()
    // }

  }
  return (
    <div className="blog">
      <div style={{ fontWeight: 'bold' }}>
        {blog.title} - {blog.author} <button onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
      </div>
      {
        view
          ?
          <div>
            <div>
              {blog.url}
            </div>
            <div>
              Likes: {blog.likes} <button onClick={handleLikes}>Like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
            <div>
              {blog.user.name === currentUser.name
                ? <button onClick={(e) => handleDelete(e, blog)}>Remove</button>
                : null
              }
            </div>
          </div>
          : null
      }
    </div>
  )
}
export default Blog