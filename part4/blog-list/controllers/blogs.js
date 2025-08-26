const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(res)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if(!decodedToken.id){
        return response.status(401).json({error: 'token data does not exist'})
    }    

    const user = await User.findById(decodedToken.id)

    if(!user){
        return response.status(400).json({error: 'invalid user'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id // id reference
    })

    if (!request.body.likes) {
        blog.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const savedBlog = await blog.save()
    // concat the blog id in the user.blogsf
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if(!decodedToken){
        return response.status(400).json({error: 'token invalid'})
    }

    const blog = await Blog.findById(request.params.id)

    if(!blog){
        return response.status(404).json({error: 'blog is not found'})
    }
    if(blog.user.toString() !== decodedToken.id.toString()){
     return response.status(403).json({error: 'not authorized to delete this blog'})
}

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    try {
        if (blog) {
            blog.likes = request.body.likes
            const updatedBlog = await blog.save()
            response.json(updatedBlog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter