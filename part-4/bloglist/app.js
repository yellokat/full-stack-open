// ======================================================
// imports
// ======================================================

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login")
const mongoose = require("mongoose");


config = require('./utils/config')
logger = require("./utils/logger")

// ======================================================
// establish database connection
// ======================================================

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// ======================================================
// initialize app
// ======================================================

const app = express()

// ======================================================
// routers & middleware
// ======================================================

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app