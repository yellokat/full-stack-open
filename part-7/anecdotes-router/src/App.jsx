import {useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Anecdote from "./components/Anecdote.jsx";
import Notification from "./components/Notification.jsx";

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
  const [notificationString, setNotificationString] = useState(null)

  const handleCreate = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotificationString(`Created new anecdote ${anecdote.content}`)
    setTimeout(()=>{
      setNotificationString(null)
    }, 5000)
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
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu/>
        <Notification notificationString={notificationString}/>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} handleVote={handleVote}/>}/>
          <Route path="/create" element={<AnecdoteForm handleCreate={handleCreate}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
