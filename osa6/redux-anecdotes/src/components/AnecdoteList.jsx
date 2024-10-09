import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote({id}))
  }

  const filteredAnecdotes = filter 
    ? anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
      sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList