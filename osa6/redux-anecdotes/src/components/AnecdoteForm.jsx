import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getId } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

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
    if (newAnecdote.trim()) {
      dispatch(addAnecdote(newAnecdote))
      setNewAnecdote('')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <input 
          value={newAnecdote} 
          onChange={(e) => setNewAnecdote(e.target.value)} 
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm
