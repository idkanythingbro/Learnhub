import { useLocation, useNavigate } from "react-router-dom";
import { enrollCourse, getCourseById } from "../../service/courses.service";
import { useEffect, useState } from "react";
import Loader from "./../../components/shared/Loader";
import Button from "../../components/shared/Button";
import { timeAgo } from "../../utils/utils";
const CourseProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  const handelCourseEnroll = () => {
    // alert(courseId);
    enrollCourse(courseId);
    navigate("/courseplayer");
  };
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      console.log(data);

      setCourse(data);
    });
  }, []);
  return (
    <div className="bg-black text-white flex flex-1">
      {
        // Before gate response from server -  show Loading...
        course !== undefined ? (
          <div className="text-white common-container">
            {
              // After gate response from server - if course is not found then show No Course Found
              course ? (
                <div className="max-w-5xl flex-col w-full">
                  <h1 className="h2-bold md:mb-10 mb-5">{course.courseName}</h1>
                  <video
                    className="w-full h-[400px] mb-5 md:mb-10"
                    src={course.introVideo}
                    controls
                  ></video>
                  <div className="flex flex-col mb-7">
                    <p className="small-regular mb-3 ml-2">
                      {course.description}
                    </p>
                    {/* <Button
                      title="Enroll"
                      id="enrollbutton"
                      routepath="/courseplayer"
                      onClick={handelCourseEnroll}
                      containerClass="hover:bg-yellow-700"
                    /> */}
                    <button
                      className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full hover:bg-yellow-700 bg-violet-50 px-7 py-3 text-black"
                      onClick={handelCourseEnroll}
                    >
                      <span className="relative font-general text-xs uppercase overflow-hidden inline-flex">
                        Enroll
                      </span>
                    </button>
                  </div>
                  <div>
                    <p className="small-regular">
                      This course was created {timeAgo(course.createdAt)} by{" "}
                      <a
                        href="/userprofile"
                        target="_blank"
                        className="hover:text-yellow-700 base-medium"
                      >
                        {course.owner.name}
                      </a>
                    </p>
                    <p className="small-regular">
                      last updated {timeAgo(course.updatedAt)}
                    </p>
                    <div className="flex gap-2 items-center m-2">
                      {course.likes.length}
                      <img src="/icons/like.svg" alt="likes" />
                    </div>
                  </div>
                  <div>
                    <h2>Course Contents :</h2>

                    {course.topics.map((topic) => (
                      <li key={topic.topicName}>{topic.topicName}</li>
                    ))}
                  </div>
                </div>
              ) : (
                <h1>No Course Found</h1>
              )
            }
          </div>
        ) : (
          <Loader />
        )
      }
    </div>
  );
};

export default CourseProfile;
