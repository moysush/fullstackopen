import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)


  return (
    <div className="blog">
      <div style={{ fontWeight: 'bold' }}>
        {blog.title} <button onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
      </div>
      {
        view
          ?
          <div>
            <div>
              {blog.url}
            </div>
            <div>
              Likes: {blog.likes} <button>Like</button>
            </div>
            <div>
              {blog.author}
            </div>
          </div>
          : null
      }
    </div>
  )
}
export default Blog