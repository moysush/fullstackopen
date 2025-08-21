const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog-model')

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find({})
    response.json(res)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.body.likes) {
        blog.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    const res = await blog.save()
    response.status(201).json(res)
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