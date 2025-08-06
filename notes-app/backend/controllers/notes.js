const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndDelete(id).then( () => {
    res.status(204).end()
  })
    .catch(error => next(error))
})

// data comes with the request body
notesRouter.post('/', (req, res, next) => {
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

  note.save()
    .then(savedNote => res.json(savedNote)) // will only show in req or res netowrk section
    .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
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