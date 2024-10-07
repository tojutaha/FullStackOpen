import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { getId } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const addAnecdote = (content) => {
    return {
      type: 'ADD',
      payload: {
        content,
        id: getId(),
        votes: 0
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(newAnecdote.trim()) {
      dispatch(addAnecdote(newAnecdote))
      setNewAnecdote('')
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input
                value={newAnecdote}
                onChange={(e) => setNewAnecdote(e.target.value)} 
              />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App