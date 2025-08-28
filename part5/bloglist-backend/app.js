const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(MONGODB_URI)
    .then(() => info("mongodb connected"))
    .catch(() => error('An error occured: ', error.message))


app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app