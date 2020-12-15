require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))

morgan.token('json', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))


let persons = [
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

app.use(express.json())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}



//create Id 
let randomId = () => {
    return Date.now();
};

app.get('/api/persons', (request, response) => {

    Person.find({}).then(persons => {
        response.json(persons)
    })

})

app.get('/api/persons/:id', (request, response) => {
    console.log("request.params.id: ", request.params)


    /*
        Person.findById(request.params.id).then(person => {
            console.log("AAAAA: ", person)
            response.json(person)
        })*/

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {

    response.write(`<p>Phonebook has info for ${persons.length} people</p>`);
    response.write(`<p> ${Date()} !</p>`);
    response.end();
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name.length == 0 || body.number.length == 0) {

        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (persons.filter(person => person.name === body.name).length !== 0) {
        return response.status(409).json({
            error: `name must be unique. conflict: ${body.name}`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: randomId()
    }

    persons = persons.concat(person)
    response.json(person)

    /*
        const person = new Person({
            name: body.name,
            number: body.number,
            id: randomId()
        })
    
        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    */
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})