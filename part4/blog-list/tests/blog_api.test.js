const app = require('../app')
const Blog = require('../models/blog-model')
const supertest = require('supertest')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')

const api = supertest(app)

const initialBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
    await Blog.deleteMany()
    // console.log('deleted');
    await Blog.insertMany(initialBlog)
    // console.log('saved')
})



test('blogs are returned in JSON format', async () => {
    // supertest lets us test with expect
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    // console.log(res.body);
})

test('blogs are returned with an id property, not an _id', async () => {
    const res = await api.get('/api/blogs')
    assert(!res.body.includes('_id'))
})

test('creating new blog post', async () => {
    const addBlog = {
        title: "Deep Work",
        author: "Cal Newport",
        likes: 100,
        url: "calnewport.com"
    }

    const res = await api
        .post('/api/blogs')
        .send(addBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedList = await blogsInDb()

    // checking the length after adding the blog
    assert.equal(updatedList.length, initialBlog.length + 1)

    // verifying the new blog without the id as it is dynamic
    const { title, author, likes, url } = updatedList[2]
    assert.deepEqual({ title, author, likes, url }, {
        title: 'Deep Work',
        author: 'Cal Newport',
        likes: 100,
        url: "calnewport.com"
    })
})

test('set likes: 0 if likes property is missing', async () => {
    const newBlog = {
        title: 'No Likes',
        author: 'X',
        url: 'nolikes.com'
    }

    const res = await api
        .post('/api/blogs')
        .send(newBlog)

    assert.equal(res.body.likes, 0)
})

test('either title or url deos not exist', async () => {
    const newBlog = {
        author: 'no title or url'
    }

    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    // console.log(res.status);
    // assert.equal(res.status, 400)
})

test('delete a single blog', async () => {
    const blogs = await blogsInDb()
    const blogToDelete = blogs[0].id

    await api
        .delete(`/api/blogs/${blogToDelete}`)
        .expect(204)

    const blogsAfter = await blogsInDb()

    assert.equal(blogsAfter.length, initialBlog.length - 1)
})

test('updating individual blog', async () => {
    const blogToUpdate = initialBlog[0]._id
    const updatedBlog = {
        likes: 15
    }
    const res = await api
        .put(`/api/blogs/${blogToUpdate}`) // params
        .send(updatedBlog) // body
        .expect(200)

    assert.equal(res.body.likes, 15)
})

// if we don't close the db then it will not stop finishing the execution of the test
after(async () => {
    await mongoose.connection.close()
})