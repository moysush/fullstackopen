const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
    // insertMany() can be used to save multiple notes together
})

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

    assert.equal(response.body.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    // we are comparing this [0]
    const notesAtStart = await helper.notesInDb()
    // console.log(notesAtStart);
    // with actual backend request
    const resultNote = await api
        .get(`/api/notes/${notesAtStart[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepEqual(resultNote.body, notesAtStart[0])
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    // console.log('Test 3: a specific note is within the returned notes')
    // console.log('Content of notes:', contents)

    assert.equal(contents.includes('HTML is easy'), true)
})

test('a valid note can be added ', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()

    assert.equal(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)

    assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await api.get('/api/notes')

    assert.equal(response.body.length, helper.initialNotes.length)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()

    const contents = notesAtEnd.map(n => n.content)

    assert(!contents.includes(noteToDelete.content))

    assert.equal(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})