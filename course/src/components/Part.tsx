import type { CoursePart } from "../App";
import { assertNever } from "../helper";

interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <div>{course.description}</div>
          <p></p>
        </div>
      );

    case "group":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <div>project exercises {course.groupProjectCount}</div>
          <p></p>
        </div>
      );

    case "background":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <div>{course.description}</div>
          <div>submit to {course.backgroundMaterial}</div>
          <p></p>
        </div >
      );

    case "special":
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <div>{course.description}</div>
          <div>required skills: {course.requirements.map((req, index) => (
            <span key={req}>
              {req}
              {index < course.requirements.length - 1 ? ", " : ""}</span>
          ))}</div>
          <p></p>
        </div >
      );

    default:
      return assertNever(course)
  }
};

export default Part;