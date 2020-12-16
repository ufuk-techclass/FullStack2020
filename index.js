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

    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.get('/info', (request, response) => {

    Person.countDocuments({})
        .then(result => {
            response.write(`<p>Phonebook has info for ${result} people</p>`);
            response.write(`<p> ${Date()} !</p>`);
            response.end();
        })
})

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (body.name.length == 0 || body.number.length == 0) {
        console.log('name or number is missing')

        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))


})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: randomId()
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(formattedSavedPerson => {
            response.json(formattedSavedPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error("error.messagewdaewds:  ", error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})