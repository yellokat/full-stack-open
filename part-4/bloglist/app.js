// ======================================================
// imports
// ======================================================

const express = require('express')
const cors = require('cors')
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")

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
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app