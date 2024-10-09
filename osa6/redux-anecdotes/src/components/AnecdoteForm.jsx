import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, getId } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newAnecdote.trim()) {
      const a = await anecdoteService.createNew(newAnecdote)
      dispatch(add(a))
      dispatch(addNotification(`Anecdote ${newAnecdote} added`))
      setNewAnecdote('')
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
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
