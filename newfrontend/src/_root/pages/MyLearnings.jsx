import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../../service/courses.service";
import Loader from "../../components/shared/Loader";
import CourseCard from "../../components/shared/CourseCard";
const MyLearnings = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const dispatch = useDispatch();
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const coursesLoading = useSelector(
    (state) => state.courseReducer.courseLoading
  );
  const enrolledCoursesData = useSelector(
    (state) => state.courseReducer.enrolledCourses
  );
  useEffect(() => {
    // dispatch(getCreatedCourses());
    dispatch(getEnrolledCourses());
  }, []);
  useEffect(() => {
    setIsCoursesLoading(coursesLoading);
  }, [coursesLoading]);
  useEffect(() => {
    setEnrolledCourses(enrolledCoursesData);
  }, [enrolledCoursesData]);
  // console.log(enrolledCourses);
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className=" max-w-screen-xl flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-light-2 h3-bold md:h2-bold text-left w-full">
            Courses
          </h2>
          {isCoursesLoading && !enrolledCourses ? (
            <Loader />
          ) : (
            <ul className="text-white flex flex-col lg:grid lg:grid-cols-2 flex-1 gap-9 w-full">
              {enrolledCourses &&
                enrolledCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearnings;
