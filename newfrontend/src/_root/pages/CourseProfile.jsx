import { Link, useLocation } from "react-router-dom";
import { enrollCourse, getCourseById, getEnrolledCourses, unenrollCourse } from "../../service/courses.service";
import { useEffect, useState } from "react";
import Loader from "./../../components/shared/Loader";
import { timeAgo } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
const CourseProfile = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const loggedInProfile = useSelector((state) => state.userReducer.profile);
  const enrollCourses = useSelector((state) => state.courseReducer.enrolledCourses);
  const handelCourseEnroll = () => {
    dispatch(enrollCourse(courseId));
  };
  const handelEnrollmentCancel = () => {
    dispatch(unenrollCourse(courseId));

  }
  useEffect(() => {
    dispatch(getEnrolledCourses())
    getCourseById(courseId).then((data) => {
      setCourse(data);
    });
   
  }, []);
  useEffect(() => {
    if (loggedInProfile) {
      const isContain = loggedInProfile.completedCourses.find((course) => course === courseId);
      setIsCompleted(isContain ? true : false);
    }
  }, [loggedInProfile]);

  useEffect(() => {

    if (enrollCourses) {
      const isContain = enrollCourses.find((course) => course._id === courseId);
      setIsEnrolled(isContain ? true : false);
    }

  }, [enrollCourses])


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
                  <div className="flex gap-5 items-start ">
                    <h1 className="h2-bold md:mb-10 mb-5">{course.courseName}</h1>
                    {isCompleted && <p className="">

                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                        <path fill="#388e3c" d="M43,38.833C43,41.135,41.135,43,38.833,43H17.167C14.866,43,13,41.135,13,38.833V17.167 C13,14.865,14.866,13,17.167,13h21.667C41.135,13,43,14.865,43,17.167V38.833z"></path><path fill="#c8e6c9" d="M35,30.833C35,33.135,33.135,35,30.833,35H9.167C6.866,35,5,33.135,5,30.833V9.167 C5,6.865,6.866,5,9.167,5h21.667C33.135,5,35,6.865,35,9.167V30.833z"></path><path fill="#4caf50" d="M18 28.121L11.064 21.186 13.186 19.064 18 23.879 28.814 13.064 30.936 15.186z"></path>
                      </svg>

                    </p>}
                  </div>
                  <video
                    className="w-full h-[400px] mb-5 md:mb-10"
                    src={course.introVideo}
                    controls
                  ></video>
                  <div className="flex flex-col mb-7">
                    <p className="small-regular mb-3 ml-2">
                      {course.description}
                    </p>

                    <div>
                      {!isEnrolled ? (
                        <button
                          className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full hover:bg-yellow-700 bg-violet-50 px-7 py-3 text-black"
                          onClick={handelCourseEnroll}
                        >
                          <span className="relative font-general text-xs uppercase overflow-hidden inline-flex">
                            Enroll
                          </span>
                        </button>
                      ) : (
                        <div className="flex gap-3">
                          <Link
                            to={`/courseplayer?courseId=${courseId}`}
                            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full hover:bg-yellow-700 bg-violet-50 px-7 py-3 text-black"
                          >
                            <span className="relative font-general text-xs uppercase overflow-hidden inline-flex">Get Started</span>
                          </Link>
                          <button
                            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full hover:bg-red  px-7 py-3 border border-red"
                            onClick={handelEnrollmentCancel}
                          >
                            <span className="relative font-general text-xs uppercase overflow-hidden inline-flex">Cancel Enroll</span>
                          </button>

                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="small-regular">
                      This course was created {timeAgo(course.createdAt)} by{" "}
                      <a
                        href="/userprofile"
                        target="_blank"
                        className="hover:text-yellow-700 base-medium"
                      >
                        {course.owner?.name}
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
                  <div>
                    <h2 className="h3-bold">Prerequsites :</h2>
                    <p className="small-regular">{course.prerequsite}</p>
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
