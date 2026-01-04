const {test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert/strict')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in the database', () => {
    beforeEach(async () =>{
        await User.deleteMany()
        
        const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    describe('invalid users are not added', () => {
        test('invalid usernames are not added', async ()=> {
            const users = await helper.usersInDb()
    
            const invalidUser = {
                username: 'ab', // less than 3 characters
                name: 'Abbie',
                password: 'one',
            }
    
            await api
                .post('/api/users')
                .send(invalidUser)
                .expect(400) 
                
            assert.equal(users.length, 1)
        })
        test('invalid passwords are not added', async() => {

            const invalidUser = {
                username: 'abc',
                name: 'Abbie',
                password: 'on', // less than 3 characters
            }
    
            await api
                .post('/api/users')
                .send(invalidUser)
                .expect(400) 
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})