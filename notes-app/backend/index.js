require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const app = express()
// loading note module
const Note = require('./models/note')

app.use(express.json())
// app.use(cors())
// to use the frontend, we need to use the dist build directory with the static middleware
app.use(express.static('dist'))

// let notes = [{ id: "1", content: "HTML is easy", important: true }, { id: "2", content: "Browser can execute only JavaScript", important: false }, { id: "3", content: "GET and POST are the most important methods of HTTP protocol", important: true }]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1> ')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// error handler middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    // const note = notes.find(note => note.id === id)
    // if (note) {
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }
    Note.findById(id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }) // if request is rejected
        .catch(error => {
            // console.log(error);
            // response.status(400).send({error: 'malformatted id'})
            next(error)
        })
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => Number(n.id)))
//         : 0
//     return String(maxId + 1)
// }

// data comes with the request body
app.post('/api/notes', (req, res) => {
    const body = req.body
    // check if content is provided
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    // obj for sending response
    const note = new Note({
        content: body.content,
        important: body.important || false,
        // id: generateId()
    })

    // notes = notes.concat(note)
    // console.log(note)
    // res.json(note)
    note.save()
        .then(savedNote => res.json(savedNote)) // will only show in req or res netowrk section
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
