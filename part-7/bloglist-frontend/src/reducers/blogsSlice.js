/* eslint-disable  no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    init(state, action) {
      const initialBlogs = [...action.payload]
      initialBlogs.sort((a, b) => b.likes - a.likes)
      return initialBlogs
    },
    append(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const updatedBlog = action.payload
      const updatedBlogs = [...state].map((blog) => {
        return blog.id === updatedBlog.id ? updatedBlog : blog
      })
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      return updatedBlogs
    },
    remove(state, action) {
      const targetBlogId = action.payload
      return [...state].filter((blog) => blog.id !== targetBlogId)
    },
  },
})

export const { init, append, update, remove } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialBlogs = await blogService.getAll()
    dispatch(init(initialBlogs))
  }
}

export const createBlog = ({ newBlog, token }) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(
      {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      },
      token,
    )
    dispatch(append(createdBlog))
  }
}

export const updateBlog = ({ id, updatedLikes, token }) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(
      id,
      {
        likes: updatedLikes,
      },
      token,
    )
    dispatch(update(updatedBlog))
  }
}

export const removeBlog = ({ targetBlogId, token }) => {
  return async (dispatch) => {
    await blogService.remove({
      id: targetBlogId,
      token,
    })
    dispatch(remove(targetBlogId))
  }
}

export default blogsSlice.reducer
