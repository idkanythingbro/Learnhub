import CourseCard from "../../components/shared/CourseCard";
import Loader from "../../components/shared/Loader";

import { useEffect, useState } from "react";
import { getAllCourses } from "../../service/courses.service";
import { useDispatch, useSelector } from "react-redux";
import { set } from "react-hook-form";
const Explore = () => {
  // const isCoursesLoading = true;
  // const courses = null;
  const [courses, setCourses] = useState(null);
  const dispatch = useDispatch();
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const coursesLoading = useSelector(state => state.courseReducer.courseLoading)
  const coursesData = useSelector((state) => state.courseReducer.courses);
  // const courses = [
  //   {
  //     id: 1,
  //     courseName: "Cloud Computing",
  //     poster: "/icons/cloud.svg",
  //     owner:{
  //       name:"Sobhandev Pramanik",
  //       email:"demo@gmail.com"

  //     },
  //     createdAt: "2024-12-25T18:58:34.466+00:00",
  //     description:
  //       "This is a test course made while creating this application by its developers. It contains nothing it. Do like this course to appreciate it.",
  //     likes: 100,
  //   },
  //   {
  //     id: 2,
  //     courseName: "CyberSecurity",
  //     poster: "/icons/cloud.svg",
  //     createdBy: "Sobhandev Pramanik",
  //     createdAt: "2022-12-25T18:58:34.466+00:00",
  //     description:
  //       "This is a test course made while creating this application by its developers. It contains nothing it. Do like this course to appreciate it.",
  //     likes: [
  //like user id  
  // ],
  //   },
  // ];
  useEffect(() => {
    dispatch(getAllCourses())
  }, [])
  useEffect(() => {
    setIsCoursesLoading(coursesLoading)
  }, [coursesLoading])
  useEffect(() => {
    console.log("coursesData", coursesData);

    setCourses(coursesData)
  }, [coursesData])
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-light-2 h3-bold md:h2-bold text-left w-full">
            Courses
          </h2>
          {isCoursesLoading && !courses ? (
            <Loader />
          ) : (
            <ul className="text-white flex flex-col flex-1 gap-9 w-full">
              {courses && courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
