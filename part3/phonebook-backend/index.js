const express = require('express')
const app = express()

const persons = [
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
    if(person){
        res.send(person)
    } else {
        res.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
