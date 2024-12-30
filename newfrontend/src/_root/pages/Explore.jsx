import CourseCard from "../../components/shared/CourseCard";
import Loader from "../../components/shared/Loader";

import { useEffect } from "react";
import { getAllCourses } from "../../service/courses.service";

const Explore = () => {
  // const isCoursesLoading = true;
  // const courses = null;
  const isCoursesLoading = false;
  const courses = [
    {
      id: 1,
      courseName: "Cloud Computing",
      poster: "/icons/cloud.svg",
      createdBy: "Basant Raj Sah",
      createdAt: "2024-12-25T18:58:34.466+00:00",
      description:
        "This is a test course made while creating this application by its developers. It contains nothing it. Do like this course to appreciate it.",
      likes: 100,
    },
    {
      id: 2,
      courseName: "CyberSecurity",
      poster: "/icons/cloud.svg",
      createdBy: "Sobhandev Pramanik",
      createdAt: "2022-12-25T18:58:34.466+00:00",
      description:
        "This is a test course made while creating this application by its developers. It contains nothing it. Do like this course to appreciate it.",
      likes: 100,
    },
  ];
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
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  useEffect(()=>{
    getAllCourses()
  },[])
  return <div>Explore</div>;
};

export default Explore;
