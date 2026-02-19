// Interfaces
// Base Interfaces
interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  totalExercises: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

// Individual Course Part Interfaces
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirement;

// Data
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
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
    kind: "special",
  },
];

// Components
const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => {
        return <Part key={`${part.name}-${index}`} part={part} />;
      })}
    </div>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const commonContent = (
    <div>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>
    </div>
  );
  // for the default switch statement part
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };
  // Switch statements to narrow the types otherwise we can't access the different properties
  switch (part.kind) {
    case "basic":
      return (
        <div>
          {commonContent}
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          {commonContent}
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          {commonContent}
          <i>{part.description}</i>
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          {commonContent}
          <p>Required Skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Total = ({ totalExercises }: TotalProps) => {
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName: string = "Half Stack application development";

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
