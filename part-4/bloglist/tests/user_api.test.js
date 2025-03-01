// ======================================================
// imports
// ======================================================
const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const {initialBlogs, blogsInDb, getBlogs} = require("./mocks/blogMocks");
const {getInitialUsers, getUsers} = require("./mocks/userMocks")

// ======================================================
// initialize app
// ======================================================

const api = supertest(app)

// ======================================================
// pre-test script
// ======================================================

beforeEach(async () => {
  // delete all users
  await User.deleteMany({})
  // save initial users
  const initialUsers = await getInitialUsers()
  for (const initialUser of initialUsers) {
    await new User(initialUser).save()
  }
})

// ======================================================
// test cases
// ======================================================

describe("create user", () => {
  test('successful response returns 201 and json of created user (without password)', async () => {
    const newUserData = {
      username: "username",
      password: "password",
      name: "Seungwon Jang"
    }

    // expect 201 and application/json
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // returns data of created user without password
    const body = response.body
    assert.strictEqual("password" in body, false)
    assert.strictEqual("passwordHash" in body, false)
    delete body.id
    delete newUserData.password
    assert.deepStrictEqual(body, newUserData)
  })

  test('username is required', async () => {
    const newUserData = {
      password: "password",
      name: "Seungwon Jang"
    }
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(400)

    assert("error" in response.body)
    assert(response.body.error.toLowerCase().includes(
      "User validation failed: username: Path `username` is required.".toLowerCase())
    )
  })

  test('username must be longer than 3 characters', async () => {
    const newUserData = {
      username: "me",
      password: "password",
      name: "Seungwon Jang"
    }
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(400)

    assert("error" in response.body)
    assert(response.body.error.toLowerCase().includes(
      "User validation failed: username: Path `username`".toLowerCase())
    )
  })

  test('username must be unique', async () => {
    const duplicateUserName = (await getUsers())[0].username
    const newUserData = {
      username: duplicateUserName,
      password: "password",
      name: "Seungwon Jang"
    }
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(400)

    assert("error" in response.body)
    assert(response.body.error.toLowerCase().includes(
      "expected `username` to be unique".toLowerCase())
    )
  })

  test('password is required', async () => {
    const newUserData = {
      username: "username",
      name: "Seungwon Jang"
    }
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(400)

    assert("error" in response.body)
    assert(response.body.error.toLowerCase().includes(
      `Field \"password\" is required.`.toLowerCase())
    )
  })

  test('password must be longer than 3 characters', async () => {
    const newUserData = {
      username: "username",
      password: "pw",
      name: "Seungwon Jang"
    }
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(400)

    assert("error" in response.body)
    assert(response.body.error.toLowerCase().includes(
      `Password must be more than 3 characters.`.toLowerCase())
    )
  })

  test('list of saved users in database increases by one', async () => {
    const newUserData = {
      username: "username",
      password: "password",
      name: "Seungwon Jang"
    }

    let usersInDb = await getUsers()
    const initialUserCount = usersInDb.length

    // expect 201 and application/json
    const response = await api
      .post(`/api/users`)
      .send(newUserData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // number of users should have increased by 1
    usersInDb = await getUsers()
    assert.strictEqual(usersInDb.length, initialUserCount + 1)
  })
})

// ======================================================
// post-test script
// ======================================================

after(async () => {
  await mongoose.connection.close()
})
