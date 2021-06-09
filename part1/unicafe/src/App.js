import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Heading = (props) => (
  <h1>
    {props.name}
  </h1>
)

const Statistic = (props) => (
  <tr>
    <td>{props.name}</td><td>{props.value} {props.sign}</td>
  </tr>
)

const Statistics = (props) => {
  return (
    <tbody>
      <Statistic name = "good" value ={props.good}/>
      <Statistic name = "neutral" value ={props.neutral}/>
      <Statistic name = "bad" value ={props.bad}/>
      <Statistic name = "all" value = {props.sum}/>
      <Statistic name = "average" value = {props.avg}/>
      <Statistic name = "positive" value = {props.rate} sign = "%"></Statistic>
    </tbody>
  )
}

const NoClick = (props) => {
    if (props.clickNum.length === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }

    return (
      <table>
        <Statistics good = {props.good} bad={props.bad} neutral={props.neutral} sum={props.sum} 
                    avg={props.avg} rate={props.rate}/>
      </table>
    )
  }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clickNum, setAll] = useState([])

  const goodClick = () => {
    setGood(good+1)
    setAll(clickNum.concat("x"))
  }

  const neutralClick = () => {
    setNeutral(neutral+1)
    setAll(clickNum.concat("x"))
  }

  const badClick = () => {
    setBad(bad+1)
    setAll(clickNum.concat("x"))
  }

  return (
    <div>
      <Heading name = 'give feedback'/>
      <Button handleClick = {goodClick} text="good" />
      <Button handleClick = {neutralClick} text="neutral" />
      <Button handleClick = {badClick} text="bad" />
      <Heading name = "statistics" />
      <NoClick clickNum = {clickNum} good = {good} bad={bad} neutral={neutral} sum={good+bad+neutral} 
               avg={(good-bad)/(good+bad+neutral)} rate={good/(good+bad+neutral)*100}/>
    </div>
  )
}



export default App