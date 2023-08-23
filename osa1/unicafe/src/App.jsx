import { useState } from 'react'

const Statistics = (props) => {

  const count = () => {
    return props.good + props.bad + props.neutral
  }

  const average = () => {
    if (count() <= 0) {
      return 0
    }
    const sum = (props.good) + (props.bad * -1)
    return sum / count();
  }

  const positive = () => {
    if (count() <= 0) {
      return 0
    }
    return (props.good / count()) * 100
  }

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {average()}</p>
      <p>positive {positive()} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodClicked = () => {
    console.log(good)
    setGood(good + 1)
  }

  const NeutralClicked = () => {
    console.log(neutral)
    setNeutral(neutral + 1)
  }

  const BadClicked = () => {
    console.log(bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={GoodClicked}>good</button>
      <button onClick={NeutralClicked}>neutral</button>
      <button onClick={BadClicked}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
