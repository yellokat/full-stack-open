// ======================================================
// imports
// ======================================================

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// ======================================================
// middleware configuration
// ======================================================

// request logger
const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
  ].join(' ')
})

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  }
  next(error)
}

// unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

// ======================================================
// initialize app
// ======================================================

const app = express()

// add middleware
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

// ======================================================
// endpoints
// ======================================================

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// get a single person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(foundPerson => {
    if (foundPerson) {
      response.json(foundPerson) // -> application/json 응답 보내기
    } else {
      response.status(404).json({
        error: 'no such resource'
      })
    }
  }).catch(error => next(error))
})

// delete a single person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

// get info
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const count = persons.length
    const dateTime = Date()
    return response.send(`Phonebook has info for ${count} people <br/><br/> ${dateTime}`)
  })
})

// add a single person
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

// modify a single person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  ).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

// ======================================================
// start server
// ======================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})