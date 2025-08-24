const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user', {username: 1, name: 1})
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

  // finding the user
  const user = await User.findById(body.userId)

  if(!user){
    return res.status(400).json({error: 'userId missing or not valid'})
  }
  // obj for sending response
  const note = new Note({
    content: body.content,
    important: body.important || false,
    // include the user detail
    user: user._id
  })

  const savedNote = await note.save()
  // save the notes id in user
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

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