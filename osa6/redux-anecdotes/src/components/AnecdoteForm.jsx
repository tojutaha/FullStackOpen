import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, getId } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newAnecdote.trim()) {
      dispatch(add({
        content: newAnecdote,
        id: getId(),
        votes: 0,
      }))
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
