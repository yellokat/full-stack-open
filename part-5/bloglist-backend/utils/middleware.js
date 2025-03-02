const logger = require('./logger')
const jwt = require("jsonwebtoken")
const User = require("../models/user")

// request logger config
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  // code that extracts JWT from header
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token){
    return response.status(401).json({error: 'token invalid - no jwt provided'})
  }
  // if token exists (if truthy)
  if (request.token) {
    // verify jwt
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid - incorrect signing'})
    }
    // set user field of request object
    const foundUser = await User.findById(decodedToken.id)
    if (!foundUser) {
      return response.status(401).json({error: 'token invalid - no such user'})
    }
    request.user = foundUser
  }
  next()
}

const unknownEndpoint = (request, response) => {
  return response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'NotExistResourceError') {
    return response.status(404).json({error: error.message})
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: 'expected `username` to be unique'})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'token invalid'})
  }

  next(error)
}

module.exports = {requestLogger, errorHandler, unknownEndpoint, tokenExtractor, userExtractor}