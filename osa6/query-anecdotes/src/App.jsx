import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { NotificationProvider } from '../NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const { notify } = useContext(NotificationContext)

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(updatedAnecdote)
    notify(`anecdote '${anecdote.content}' voted`)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if(result.isLoading) {
    return <div>Loading...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
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

// hack..
const WrappedApp = () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
)

export default WrappedApp