const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const errors = require('../models/errors')

// get all users
usersRouter.get('/', async (request, response) => {
  const foundUsers = await User.find({})
  return response.json(foundUsers)
})

// create a user
usersRouter.post('/', async (request, response) => {
  // parse body
  const { username, name, password } = request.body

  // password validation
  if(!password){
    return response.status(400).json({error: 'Field "password" is required.'})
  }
  if(password.length < 3){
    return response.status(400).json({error: "Password must be more than 3 characters."})
  }

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
  return response.status(201).json(savedUser)
})

module.exports = usersRouter