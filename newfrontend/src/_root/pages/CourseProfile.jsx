import { useLocation } from "react-router-dom";
import { enrollCourse } from "../../service/courses.service";

const CourseProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const handelCourseEnroll = () => {
    // alert(courseId);
    enrollCourse(courseId);
  };
  return (<div>
    <button onClick={handelCourseEnroll} className="btn btn-primary text-white mt-12">
      Enrolled the course
    </button>
  </div>);
};

export default CourseProfile;
