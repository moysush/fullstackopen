import { useState } from "react"

const Blog = ({ blog, updatelikes }) => {
  const [view, setView] = useState(false)

  const handleLikes = (e) => {
    e.preventDefault()

    updatelikes({
      ...blog,
      likes: blog.likes + 1
    })

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
              {blog.user? blog.user.name : null}
            </div>
          </div>
          : null
      }
    </div>
  )
}
export default Blog