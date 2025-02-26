// noinspection DuplicatedCode
logger = require("../utils/logger")
config = require('../utils/config')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)