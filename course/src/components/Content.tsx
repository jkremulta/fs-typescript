import Part from "./Part";
import type { CoursePart } from "../App";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <>
      {courses.map((c) => (
        <Part course={c}></Part>
      ))}
    </>
  )
}

export default Content