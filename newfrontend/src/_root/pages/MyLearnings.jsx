import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../../service/courses.service";
const MyLearnings = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const dispatch = useDispatch();
  const enrolledCoursesData = useSelector(
    (state) => state.courseReducer.enrolledCourses
  );
  useEffect(() => {
    // dispatch(getCreatedCourses());
    dispatch(getEnrolledCourses());
  }, []);
  useEffect(() => {
    setEnrolledCourses(enrolledCoursesData);
  }, [enrolledCoursesData]);
  console.log(enrolledCourses);
  return <div>Nothing</div>;
};

export default MyLearnings;
