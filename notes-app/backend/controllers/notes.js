const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const note = await Note.findById(id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Note.findByIdAndDelete(id)
    res.status(204).end()
})

// data comes with the request body
notesRouter.post('/', async (req, res) => {
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
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then(note => {
      if(!note){
        return res.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then(updatedNote => res.json(updatedNote))
    })
    .catch(error => next(error))
})

module.exports = notesRouter