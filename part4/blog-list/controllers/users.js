const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body // User model er vitor use korle mongodb format kora hoy

    // password validation
    if(!password || password.length < 3){
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    }

    // encrypted password
    const passwordHash = await bcrypt.hash(password, 10)

    // assining the values
    const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter