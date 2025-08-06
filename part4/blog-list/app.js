const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogs-controller')

const app = express()

mongoose.connect(MONGODB_URI)
    .then(() => info("mongodb connected"))
    .catch(() => error('An error occured: ', error.message))

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app