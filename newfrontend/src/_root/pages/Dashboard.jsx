import { useEffect, useState } from "react";
import {
  getCreatedCourses,
  getEnrolledCourses,
} from "../../service/courses.service";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [createdCourses, setCreatedCourses] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const dispatch = useDispatch();
  const createdCoursesData = useSelector(
    (state) => state.courseReducer.createdCourses
  );
  const enrolledCoursesData = useSelector(
    (state) => state.courseReducer.enrolledCourses
  );
  useEffect(() => {
    dispatch(getCreatedCourses());
    dispatch(getEnrolledCourses());
  }, []);
  useEffect(() => {
    setCreatedCourses(createdCoursesData);
  }, [createdCoursesData]);
  useEffect(() => {
    setEnrolledCourses(enrolledCoursesData);
  }, [enrolledCoursesData]);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2 className="text-yellow-300">Created Courses</h2>
        {createdCourses &&
          createdCourses.map((course) => {
            return (
              <div className="text-white border m-4" key={course._id}>
                <h3>{course.courseName}</h3>
                <p>{course.description}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h2 className="text-yellow-300">Enrolled Courses</h2>
        {enrolledCourses &&
          enrolledCourses.map((course) => {
            return (
              <div
                className="text-white border border-blue-300 m-4"
                key={course._id}
              >
                <h3>{course.courseName}</h3>
                <p>{course.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
