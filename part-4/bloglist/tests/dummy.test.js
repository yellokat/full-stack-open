// import libraries
const {test, describe} = require("node:test")
const assert = require('node:assert')

// import test targets & scheme
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

// mock objects
const blogMock1 = new Blog({
  "title": "test1",
  "author": "tester1",
  "url": "testurl1",
  "likes": 1
})
const blogMock2 = new Blog({
  "title": "test2",
  "author": "tester2",
  "url": "testurl2",
  "likes": 2
})
const blogMock3 = new Blog({
  "title": "test3",
  "author": "tester3",
  "url": "testurl3",
  "likes": 3
})
const blogMock4 = new Blog({
  "title": "test4",
  "author": "tester4",
  "url": "testurl4",
  "likes": 4
})
const blogMock5 = new Blog({
  "title": "test5",
  "author": "tester5",
  "url": "testurl5",
  "likes": 5
})

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test("of a single blog entry", ()=>{
    const blogs = [blogMock1]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 1)
  })

  test("of multiple blog entries", () => {
    const blogs = [blogMock1, blogMock2, blogMock3]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 6)
  })
})

describe("favorite blog", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", ()=>{
    const blogs = [blogMock1]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogMock1)
  })

  test("of multiple blog entries", () => {
    const blogs = [blogMock1, blogMock2, blogMock3]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogMock3)
  })
})

describe("most blogs", ()=>{
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", ()=>{
    const blogs = [blogMock1]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: blogMock1.author,
      blogs: 1
    })
  })

  test("of multiple blog entries", () => {
    const blogs = [blogMock1, blogMock1, blogMock2, blogMock2, blogMock2, blogMock3]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: blogMock2.author,
      blogs: 3
    })
  })
})

describe("most liked blogs", ()=> {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", ()=>{
    const blogs = [blogMock1]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: blogMock1.author,
      likes: blogMock1.likes
    })
  })

  test("of multiple blog entries", ()=>{
    const blogs = [blogMock1, blogMock1, blogMock2, blogMock2, blogMock2, blogMock3]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: blogMock2.author,
      likes: 6
    })
  })
})