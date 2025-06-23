const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

// info page
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> 
        <p>${Date()}</p>`)
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
    persons = persons.filter(p => p.id !== id)
    // console.log(persons);
    res.status(204).end()
})

// create new 
app.post('/api/persons', (req, res) => {
    const body = req.body // request comes with the body property

    // doesn't let create a new person int he phonebook if the number is missing
    if (!body.number) {
        return res.status(400).send({
            error: 'number missing'
        })
    }

    // unique id using Math.random, big enough to not have the possiblity of duplicate id
    const generateId = () => {
        return String(Math.floor(Math.random() * 100000))
    }

    // add object for person
    const addPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    // finally add the person in the phonebook
    persons = persons.concat(addPerson)
    // respond to show when the request is made
    res.send(addPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
