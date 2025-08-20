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

beforeEach(async () => {
    await Blog.deleteMany()
    console.log('deleted');
    await Blog.insertMany(initialBlog)
    console.log('saved')
})

test('blogs are returned in JSON format', async () => {
    // supertest let us test with expect
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    console.log(JSON.stringify(res.body, null, 2));
})

// if we don't close the db then it will not stop finishing the execution of the test
after(async () => {
    await mongoose.connection.close()
})