
interface headerProps {
  name: string,
}

const Header = (props: headerProps) => {
  return <h1>{props.name}</h1>
}

interface contentProps {
  parts: {
    name: string;
    exerciseCount: number
  }[];
}

const Content = ({ parts }: contentProps) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

interface totalProps {
  count: number,
}

const Total = (props: totalProps) => {
  return <p>Number of exercises {props.count}</p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total count={totalExercises}/>
    </div>
  );
};

export default App;