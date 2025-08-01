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
        response.status(400).send({error: 'malformatted id'})
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
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id // request paramenter
    // find the exact person
    const person = persons.find(p => p.id === id)
    // returning server status 404 if the person isn't found
    if (person) {
        res.send(person)
    } else {
        res.status(404).end()
    }
})

// deleting individual person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    // persons = persons.filter(p => p.id !== id)
    Person.findByIdAndDelete(id).then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

// create new 
app.post('/api/persons', (req, res) => {
    const body = req.body // request comes with the body property

    // // doesn't let user create a new person in the phonebook if the number is missing
    // if (!body.number || !body.name) {
    //     return res.status(400).send({
    //         error: 'either name or number is missing'
    //     })
    // }

    // check for duplicate name
    // if (persons.find(p => p.name === body.name)){
    //     return res.status(400).send({
    //         error: 'name must be unique'
    //     })
    // }

    // unique id using Math.random, big enough to not have the possiblity of duplicate id
    // const generateId = () => {
    //     return String(Math.floor(Math.random() * 100000))
    // }

    // add object for person
    const addPerson = new Person({
        // id: generateId(),
        name: body.name,
        number: body.number,
    })

    // finally add the person in the phonebook
    // persons = persons.concat(addPerson)
    // respond to show when the request is made
    addPerson.save().then(person => {
        console.log(person)
        res.send(person)
    })
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
