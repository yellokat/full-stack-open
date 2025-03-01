const Blog = require('../../models/blog')

// reusable blog mock objects
const blogMock1 = {
  "title": "test1",
  "author": "tester1",
  "url": "testurl1",
  "likes": 1
}
const blogMock2 = {
  "title": "test2",
  "author": "tester2",
  "url": "testurl2",
  "likes": 2
}
const blogMock3 = {
  "title": "test3",
  "author": "tester3",
  "url": "testurl3",
  "likes": 3
}
const blogMock4 = {
  "title": "test4",
  "author": "tester4",
  "url": "testurl4",
  "likes": 4
}
const blogMock5 = {
  "title": "test5",
  "author": "tester5",
  "url": "testurl5",
  "likes": 5
}

const initialBlogs = [blogMock1, blogMock2, blogMock3, blogMock4, blogMock5]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {blogMock1, blogMock2, blogMock3, blogMock4, blogMock5, initialBlogs, getBlogs}