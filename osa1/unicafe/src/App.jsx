import { useState } from 'react'

const Button = (props) => <button onClick={props.func}>{props.text}</button>

const StatisticsLine = (props) => {
  const tableStyle = {
    width: '100%',
    tableLayout: 'fixed',
  };

  const cellStyle = {
    width:'auto',
    border: '1px solid #000',
  };

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={cellStyle}>{props.text}</td>
          <td style={cellStyle}>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {

  const count = () => {
    return props.good + props.bad + props.neutral
  }

  if (count() <= 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  const average = () => {
    if (count() <= 0) {
      return 0
    }
    const sum = (props.good) + (props.bad * -1)
    return (sum / count()).toFixed(1);
  }

  const positive = () => {
    if (count() <= 0) {
      return 0
    }
    return ((props.good / count()) * 100).toFixed(1);
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={count()} />
      <StatisticsLine text="average" value={average()} />
      <StatisticsLine text="positive" value={positive() + "%"} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodClicked = () => {
    setGood(good + 1)
  }

  const NeutralClicked = () => {
    setNeutral(neutral + 1)
  }

  const BadClicked = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button func={GoodClicked} text="good" />
      <Button func={NeutralClicked} text="neutral" />
      <Button func={BadClicked} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
