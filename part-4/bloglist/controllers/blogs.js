// noinspection DuplicatedCode

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const errors = require('../models/errors')

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

// delete a blogpost
blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    throw new errors.NotExistResourceError()
  } else {
    response.status(204).end()
  }
})

// update a blogpost
blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes},
    {new: true, runValidators: true, context: 'query'}
  )
  if (!updatedBlog) {
    throw new errors.NotExistResourceError()
  } else {
    response.status(200).json(updatedBlog)
  }
})

module.exports = blogsRouter