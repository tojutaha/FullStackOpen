interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = () => (
  <>
    {courseParts.map((part, index) => {
      console.log(part);
      switch (part.kind) {
        case 'basic':
          return (
            <div key={index}>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong>
              </p>
              <p>
                <i>{part.description}</i>
              </p>
            </div>
          );
        case 'group':
          return (
            <div key={index}>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong>
              </p>
              <p>
                project exercises {part.groupProjectCount}
              </p>
            </div>
          );
        case 'background':
          return (
            <div key={index}>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong>
              </p>
              <p>
                submit to {part.backgroundMaterial}
              </p>
            </div>
          );
        case 'special':
          return (
            <div key={index}>
              <p>
                <strong>{part.name} {part.exerciseCount}</strong>
              </p>
              <p>
                required skills: {part.requirements.join(', ')}
              </p>
            </div>
          );
        default:
          return assertNever(part);
      }
    })}
  </>
);

interface headerProps {
  name: string,
}

const Header = (props: headerProps) => {
  return <h1>{props.name}</h1>
}

const Content = () => {
  return (
    <Part />
  )
};

interface totalProps {
  count: number,
}

const Total = (props: totalProps) => {
  return <p>Number of exercises {props.count}</p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content />
      <Total count={totalExercises}/>
    </div>
  );
};

export default App;