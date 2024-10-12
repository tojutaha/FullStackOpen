import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if(content.length < 5) {
      console.log('Pitää olla väh. 5 merkkiä')
      return
    }

    event.target.anecdote.value = ''
    const newAnecdote = { content: content, id: getId(), votes: 0 }
    newAnecdoteMutation.mutate(newAnecdote)
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
