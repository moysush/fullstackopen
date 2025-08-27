const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)

let token

describe('when there is initally two blogs', () => {

    beforeEach(async () => {
        await User.deleteMany()
        await Blog.deleteMany()

        const user = await api
            .post('/api/users')
            .send({ username: 'root', password: 'root' })
            .expect(201)

        const login = await api
            .post('/api/login')
            .send({ username: 'root', password: 'root' })
            .expect(200)

        token = login.body.token

        for (const blog of helper.initialBlogs) {
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(blog)
        }


        // console.log('deleted');
        // await Blog.insertMany(helper.initialBlog)
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
            .set('Authorization', `Bearer ${token}`)
            .send(addBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedList = await helper.blogsInDb()

        // checking the length after adding the blog
        assert.equal(updatedList.length, helper.initialBlogs.length + 1)

        // verifying the new blog without the id as it is dynamic
        const { title, author, likes, url } = updatedList[2]
        assert.deepEqual({ title, author, likes, url }, {
            title: 'Deep Work',
            author: 'Cal Newport',
            likes: 100,
            url: "calnewport.com"
        })
    })

    test('delete a single blog', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0].id

        await api
            .delete(`/api/blogs/${blogToDelete}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDb()

        assert.equal(blogsAfter.length, helper.initialBlogs.length - 1)
    })

    test('updating individual blog', async () => {
        const blogToUpdate = await helper.blogsInDb()
        
        const res = await api
            .put(`/api/blogs/${blogToUpdate[0].id}`) // params
            .set('Authorization', `Bearer ${token}`)
            .send({likes: 15}) // body
            .expect(200)
        
        assert.equal(res.body.likes, 15)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

    assert.equal(res.body.likes, 0)
})

test('either title or url deos not exist', async () => {
    const newBlog = {
        author: 'no title or url'
    }

    const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    // console.log(res.status);
    // assert.equal(res.status, 400)
})


// if we don't close the db then it will not stop finishing the execution of the test
after(async () => {
    await mongoose.connection.close()
})