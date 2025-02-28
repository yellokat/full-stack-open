const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const errors = require('../models/errors')

// get all users
usersRouter.get('/', async (request, response) => {
  const foundUsers = await User.find({})
  response.json(foundUsers)
})

// create a user
usersRouter.post('/', async (request, response) => {
  // parse body
  const { username, name, password } = request.body

  // encrypt password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // create user -> save user -> return
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter