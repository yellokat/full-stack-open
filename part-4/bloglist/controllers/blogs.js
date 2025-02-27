// noinspection DuplicatedCode

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogposts
blogsRouter.get('/', async (request, response) => {
  const foundBlogs = await Blog.find({})
  response.json(foundBlogs)
})

// create a blogpost
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter