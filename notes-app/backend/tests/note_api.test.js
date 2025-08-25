const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initialy some notes saved', () => {
    beforeEach(async () => {
        await Note.deleteMany({})
        // console.log('cleared');
        await Note.insertMany(helper.initialNotes)
        // console.log('saved');
    })

    test('notes are returned as json', async () => {
        // console.log('entered test');
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        assert.equal(response.body.length, helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(e => e.content)
        // console.log('Test 3: a specific note is within the returned notes')
        // console.log('Content of notes:', contents)

        assert.equal(contents.includes('HTML is easy'), true)
    })



    describe('viewing a specific note', () => {
        test('succeeds with a valid id', async () => {
            const notesAtStart = await helper.notesInDb()
            // console.log(notesAtStart);
            const resultNote = await api
                .get(`/api/notes/${notesAtStart[0].id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepEqual(resultNote.body, notesAtStart[0])
        })
        test('fails with status code 404 if note does not exist', async () => {
            const id = await helper.nonExistingId()
            // const nonExistingId = new mongoose.Types.ObjectId().toString()
            
            await api
                .get(`/api/notes/${id}`)
                .expect(404)
        })
        test('fails with status code 400 if id is invalid', async() => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/notes/${invalidId}`)
                .expect(400)
            
        })
    })

    describe('addition of a new note', () => {
        test('succeeds with valid data', async () => {
            const users = await helper.usersInDb()

            const loginResponse = await api
                .post('/api/login')
                .send({ username: users[0].username, password: 'sekret' })
                    
            const newNote = {
                content: 'async/await simplifies making async calls',
                important: true,
            }

            await api
                .post('/api/notes')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .send(newNote)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await helper.notesInDb()

            assert.equal(notesAtEnd.length, helper.initialNotes.length + 1)

            const contents = notesAtEnd.map(n => n.content)

            assert(contents.includes('async/await simplifies making async calls'))
        })

        test('fails with status code 400 if data invalid', async () => {
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
    })

    describe('deletion of a note', () => {
        test('succeeds with status code 204 if id is valid', async () => {
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

        test('fails with status code 400 if id is invalid', async() => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .delete(`/api/notes/${invalidId}`)
                .expect(400)
        })
    })

})


after(async () => {
    await mongoose.connection.close()
})