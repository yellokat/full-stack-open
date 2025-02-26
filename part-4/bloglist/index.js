// ======================================================
// imports
// ======================================================

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Blog = require("./models/blog")
const middleware = require("./utils/middleware")

// const app = require("./app")
// const config = require("./utils/config")
const logger = require("./utils/logger")

// ======================================================
// initialize app
// ======================================================

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors())

// ======================================================
// endpoints
// ======================================================

// get all blogposts
app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    }).catch(error=>next(error))
})

// create a blogpost
app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch(error=>next(error))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// ======================================================
// start server
// ======================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})