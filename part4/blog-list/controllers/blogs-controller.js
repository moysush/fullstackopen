const blogsRouter = require('express').Router()
const Blog = require('../models/blog-model')

blogsRouter.get('/', async(request, response) => {
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

module.exports = blogsRouter