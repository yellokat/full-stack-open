import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";

const initialAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [notification, setNotification] = useState('')

  const handleCreate = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleVote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} handleVote={handleVote}/>
      <About />
      <AnecdoteForm handleCreate={handleCreate} />
      <Footer />
    </div>
  )
}

export default App
