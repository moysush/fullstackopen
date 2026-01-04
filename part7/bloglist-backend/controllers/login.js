const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})

    const passwordCorrect = password === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash)
        
    if(!(user && passwordCorrect)){
        return response.stats(401).json({error: 'invalid username or password'})
    }

    const usedForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(usedForToken, process.env.SECRET, {expiresIn: 60 * 60})

    response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter