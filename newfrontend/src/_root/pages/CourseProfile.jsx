import { useLocation } from "react-router-dom";
import { enrollCourse, getCourseById } from "../../service/courses.service";
import { useEffect, useState } from "react";

const CourseProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  const handelCourseEnroll = () => {
    // alert(courseId);
    enrollCourse(courseId);
  };
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      console.log(data);

      setCourse(data);
    });
  }, [])
  return (<div>
    {
      // Before gate response from server -  show Loading...
      course !== undefined ? (

        <div className="text-white m-20">
          {
            // After gate response from server - if course is not found then show No Course Found
            course ? (
              <>
                <h1>{course.courseName}</h1>
                <p>{course.description}</p>
                <video src={course.introVideo} controls></video>
                <button className="border p-4" onClick={handelCourseEnroll}>Enroll</button>
              </>
            ) : (<h1>No Course Found</h1>)
          }
        </div>

      ) : (
        <h1>Loading...</h1>
      )
    }
  </div>);
};

export default CourseProfile;
