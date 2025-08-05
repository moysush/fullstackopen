require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const Person = require('./models/phonebook')

app.use(express.json()) // for recieving data with json.parser
// static middleware for showing frontend
app.use(express.static('dist'))

// morgan is used for showing the api response in the console. 
// create token body to get the body content and stringify it to show it as a string
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// let persons = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
     if(error.name == 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
     } else if(error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
     }
    next(error)
}

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.send(person)
    })
})

// info page
app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        res.send(`<p>Phonebook has info for ${count} people</p> 
            <p>${Date()}</p>`)
    })
})

// inidividual person
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id // request paramenter

    Person.findById(id).then(person => {
        if(person){
            res.send(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

// deleting individual person
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

// create new 
app.post('/api/persons', (req, res, next) => {
    const body = req.body // request comes with the body property

    // add object for person
    const addPerson = new Person({
        // id: generateId(),
        name: body.name,
        number: body.number,
    })

    // finally add the person in the phonebook
    // respond to show when the request is made
    addPerson.save().then(person => {
        console.log(person)
        res.send(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findById(request.params.id).then(person => {
        person.name = name
        person.number = number

        return person.save().then(result => response.json(result))
    })
    .catch(error => next(error))
})

// unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(400).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

// process.env.PORT sets the port dynamically or uses the 3001 if not available
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
