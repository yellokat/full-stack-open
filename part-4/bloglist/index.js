// ======================================================
// imports
// ======================================================

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Blog = require("./models/blog")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")

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
// routers
// ======================================================

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// ======================================================
// start server
// ======================================================

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})