import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.jsx";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn : createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
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
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
