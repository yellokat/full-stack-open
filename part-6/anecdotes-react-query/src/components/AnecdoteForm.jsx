import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.jsx";
import NotificationContext from "../notificationContext.jsx";
import {useContext} from "react";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notificationString, notificationStringDispatch] = useContext(NotificationContext)

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
      notificationStringDispatch({
        type: "SET",
        payload: `Created anecdote : ${createdAnecdote.content}`
      })
      setTimeout(() => {
        notificationStringDispatch({type: "REMOVE"})
      }, 5000)
    },
    onError: ()=>{
      notificationStringDispatch({
        type: "SET",
        payload: `Too short anecdote, must have length 5 or more.`
      })
      setTimeout(() => {
        notificationStringDispatch({type: "REMOVE"})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({
      content,
      votes: 0,
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote'/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
