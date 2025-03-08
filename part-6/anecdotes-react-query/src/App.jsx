import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {getAnecdotes, voteAnecdote} from './requests.jsx'

const App = () => {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if(result.isError){
    return <div>anecdote service not available due to server error</div>
  }



  const handleVote = (anecdote)=>{
    updateMutation.mutate({
      ...anecdote,
      votes: anecdote.votes+1
    })
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
  )
}

export default App
