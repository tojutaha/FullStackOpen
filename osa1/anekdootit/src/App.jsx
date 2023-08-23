import { useState } from 'react'

const Button = (props) => <button onClick={props.func}>{props.text}</button>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const initialPoints = Array.from({length: anecdotes.length}, () => 0)
  const [points, setPoints] = useState(initialPoints)

  const NextButtonClicked = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const VoteButtonClicked = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button func={VoteButtonClicked} text="vote" />
      <Button func={NextButtonClicked} text="next anecdote" />
    </div>
  )
}

export default App