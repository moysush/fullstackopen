import Header from "./Header"
import Content from "./Content"

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({course}) => {
    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>)
}

export default Course