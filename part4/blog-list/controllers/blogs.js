const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(res)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id // khali id pathacchi
    })

    if (!request.body.likes) {
        blog.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    console.log(blog);

    const savedBlog = await blog.save()
    // concat the blog id in the user.blogsf
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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