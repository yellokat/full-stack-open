const User = require('../../models/user')
const bcrypt = require("bcrypt");

// reusable blog mock objects
const userMock1 = {
  "username": "tester1",
  "password": "tester1",
  "name": "tester1name"
}
const userMock2 = {
  "username": "tester2",
  "password": "tester2",
  "name": "tester2name"
}
const userMock3 = {
  "username": "tester3",
  "password": "tester3",
  "name": "tester3name"
}

const getInitialUsers = async () => {
  const saltRounds = 10;
  // encode password of initial users
  const initialUsers = [userMock1, userMock2, userMock3]
  return Promise.all(initialUsers.map(async (userMock) => {
      const user = {...userMock}
      user.passwordHash = await bcrypt.hash(user.password, saltRounds)
      delete user.password
      return user
    })
  )
}

const getUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {getInitialUsers, getUsers}