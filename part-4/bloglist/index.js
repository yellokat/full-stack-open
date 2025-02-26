// ======================================================
// imports
// ======================================================

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Blog = require("./models/blog")

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

// ======================================================
// initialize app
// ======================================================

const app = express()

app.use(express.json())
app.use(requestLogger)
app.use(cors())

// ======================================================
// endpoints
// ======================================================

// get all blogposts
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// create a blogpost
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// ======================================================
// start server
// ======================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})