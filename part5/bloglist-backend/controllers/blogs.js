const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(res)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'invalid user' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id // id reference
    })

    if (!request.body.likes) {
        blog.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const savedBlog = await blog.save()
    // concat the blog id in the user.blogs
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user    

    if (!request.token) {
        return response.status(400).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog is not found' })
    }
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(403).json({ error: 'not authorized to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    // remove the blog id
    user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
    await user.save()

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    // const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog is not found' })
    }

    // if (blog.user.toString() !== user.id.toString()) {
    //     return response.status(403).json({ error: 'not authorized to update this blog' })
    // }

    blog.likes = request.body.likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog) // auto sends 200 status code    
})

module.exports = blogsRouter