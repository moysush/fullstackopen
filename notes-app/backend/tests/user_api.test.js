const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert/strict')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

describe('when there is initialy one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User(
            {
                username: 'root',
                passwordHash
            }
        )

        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti luukainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.equal(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails if username and password is not of length greater than 4 and 6', async () => {
        
        const invalidUserNameAndPassword = {
            username: '333',
            password: '666666'
        }
        
        await api
        .post('/api/users')
        .send(invalidUserNameAndPassword)
        .expect(400) // custom error handler defined for ValidationError
        
        const users = await helper.usersInDb()
        
        assert.equal(users.length, 1) // data doesn't increment
    })
})

after( async () => {
   await mongoose.connection.close()
    console.log('finished running tests for user');
})