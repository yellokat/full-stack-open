import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios
    .get(baseUrl)
    .then(res => {
      const anecdotes = res.data
      anecdotes.sort((a, b) => b.votes - a.votes)
      return anecdotes;
    })
}

export const createAnecdote = (newAnecdote) => {
  return axios
    .post(baseUrl, newAnecdote)
    .then(res => res.data)
}

export const voteAnecdote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => res.data)
}