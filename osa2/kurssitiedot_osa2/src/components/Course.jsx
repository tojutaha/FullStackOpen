const Course = ({ courses }) => {

  const elements = courses.map(course => {
    return (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <p><b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
      </div>
    )
  })

  return <div>{elements}</div>
}

const Header = ({ course }) => <h1>{course}</h1>
const Content = (props) => <>{props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}</>
const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

export default Course