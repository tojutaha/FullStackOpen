const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p>Number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </div>
  )
}

const Header = ({course}) => <h1>{course}</h1>
const Content = (props) => <>{props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}</>
const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamendals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App