const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')

const api = supertest(app)

test('notes are returned as json', async () => {
    // const response = 
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // Log the response data to the console
    // console.log('Test 1: notes are returned as json')
    // console.log('Status code:', response.status)
    // console.log('Content-Type:', response.header['content-type'])
    // console.log('---------------------------------')
})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    // Log the response body and its length
    // console.log('Test 2: all notes are returned')
    // console.log('Received notes:', response.body)
    // console.log('Number of notes:', response.body.length)

    assert.equal(response.body.length, 2)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    // console.log('Test 3: a specific note is within the returned notes')
    // console.log('Content of notes:', contents)

    assert.equal(contents.includes('HTML is easy'), true)
})

after(async () => {
    await mongoose.connection.close()
})