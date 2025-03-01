// noinspection DuplicatedCode

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const errors = require('../models/errors')

// get all blogposts
blogsRouter.get('/', async (request, response) => {
  const foundBlogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(foundBlogs)
})

// create a blogpost
blogsRouter.post('/', async (request, response) => {
  // random user is designated as creator
  const users = await User.find({})
  const randomUserId = users[Math.floor(Math.random() * users.length)].id;
  const newBlogData = {...request.body, user: randomUserId}
  // save blog post
  const blog = new Blog(newBlogData)
  const savedBlog = await blog.save()
  // assign blog post to user as well
  await User.findByIdAndUpdate(
    randomUserId,
    {$push:{blogs:savedBlog.id}},
    {context: 'query'}
  )
  response.status(201).json(await savedBlog.populate('user', {username:1, name:1}))
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
  ).populate('user', {username:1, name:1})
  if (!updatedBlog) {
    throw new errors.NotExistResourceError()
  } else {
    response.status(200).json(updatedBlog)
  }
})

module.exports = blogsRouter