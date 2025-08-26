const unknownEndpoint = (request, response) => {
    return response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name ==='CastError') {
        return response.status(400).json({error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
}

module.exports = { errorHandler, unknownEndpoint }