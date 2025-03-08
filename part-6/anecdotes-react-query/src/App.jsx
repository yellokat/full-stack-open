import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {getAnecdotes, voteAnecdote} from './requests.jsx'
import {useReducer} from "react";
import NotificationContext from "./notificationContext"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
      return null
    default:
      return state
  }
}

const App = () => {
  const [notificationString, notificationStringDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = [...anecdotes].map((anecdote) => {
        if (anecdote.id === updatedAnecdote.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      updatedAnecdotes.sort((a, b) => b.votes - a.votes)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationStringDispatch({
        type: "SET",
        payload: `You voted for anecdote : ${updatedAnecdote.content}`
      })
      setTimeout(() => {
        notificationStringDispatch({type: "REMOVE"})
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to server error</div>
  }

  const handleVote = (anecdote) => {
    updateMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[ notificationString, notificationStringDispatch ]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification/>
        <AnecdoteForm/>

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
