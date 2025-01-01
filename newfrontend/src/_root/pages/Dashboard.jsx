import { useEffect, useState } from "react";
import {
  getCreatedCourses,
  getEnrolledCourses,
} from "../../service/courses.service";
import { useDispatch, useSelector } from "react-redux";
import EditCourseCard from "../../components/shared/EditCourseCard";
import CourseCard from "../../components/shared/CourseCard";
import Loader from "../../components/shared/Loader";

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
  // console.log(createdCourses);
  return (
    <div className="bg-black text-white flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/icons/dashboard.svg" alt="Add" width={36} height={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Dashboard</h2>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
            <div className=" max-w-screen-xl flex flex-col items-center w-full gap-6 md:gap-9">
              <h2 className="text-light-2 h3-bold  text-left w-full">
                Created Courses
              </h2>
              <ul className="text-white flex flex-col lg:grid lg:grid-cols-2 flex-1 gap-9 w-full">
                {createdCourses &&
                  createdCourses.map((course) => (
                    <EditCourseCard key={course._id} course={course} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
