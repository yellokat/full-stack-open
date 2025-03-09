// noinspection DuplicatedCode

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const errors = require('../models/errors')
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

// get all blogposts
blogsRouter.get('/', async (request, response) => {
  const foundBlogs = await Blog.find({}).populate('user', {username:1, name:1})
  return response.json(foundBlogs)
})

// create a blogpost
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const currentUser = request.user
  // save blog post
  const newBlogData = {...request.body, user: currentUser.id}
  const blog = new Blog(newBlogData)
  const savedBlog = await blog.save()
  // assign blog post to user as well
  currentUser.blogs.push(savedBlog.id);
  await currentUser.save()
  return response.status(201).json(await savedBlog.populate('user', {username:1, name:1}))
})

// delete a blogpost
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // current user
  const currentUser = request.user
  // deletion target
  const targetBlog = await Blog.findById(request.params.id)
  if(!targetBlog){
    throw new errors.NotExistResourceError()
  }
  // verify identity (compare tokens)
  if(targetBlog.user.toString() !== currentUser.id){
    return response.status(401).json({error: "permission denied"})
  }
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

// update a blogpost
blogsRouter.put('/:id', middleware.userExtractor,async (request, response) => {
  // // current user
  // const currentUser = request.user
  // update target
  const targetBlog = await Blog.findById(request.params.id)
  if(!targetBlog){
    throw new errors.NotExistResourceError()
  }
  // // verify identity (compare tokens)
  // if(targetBlog.user.toString() !== currentUser.id){
  //   return response.status(401).json({error: "permission denied"})
  // }
  const {title, author, url, likes} = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes},
    {new: true, runValidators: true, context: 'query'}
  ).populate('user', {username:1, name:1})
  return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter