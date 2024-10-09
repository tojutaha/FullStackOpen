import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newAnecdote.trim()) {
      dispatch(createAnecdote(newAnecdote))
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
