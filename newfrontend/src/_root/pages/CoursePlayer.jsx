import { useEffect, useRef, useState } from "react";
import {
  getCourseById,
  likeCourse,
  markTopicAsCompleted,
  updateCompletedCourses,
} from "../../service/courses.service";
import Loader from "./../../components/shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../service/user.service";
import Swal from 'sweetalert2/dist/sweetalert2.js'
const CoursePlayer = () => {
  const dispatch = useDispatch();
  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const [currentTopic, setCurrentTopic] = useState(undefined);
  const [duration, setDuration] = useState(0); // Total duration of the video
  const [isCompleted, setIsCompleted] = useState(false); // Check if video has been completed
  // const [isCompletedCourse, setIsCompletedCourse] = useState(false); // Check if video has been completed
  const videoRef = useRef(null);

  // const loggedInUserData = useSelector((state) => state.userReducer.user);
  const loggedInProfile = useSelector((state) => state.userReducer.profile);

  const displaySweetAlert = async () => {
    // Show the first SweetAlert
    await Swal.fire({
      title: "Course Completed",
      text: "Congratulations! You have successfully completed the course.",
      icon: "success",
      confirmButtonText: "Ok",
    });


    // Show the second SweetAlert
    const result = await Swal.fire({
      title: "Do you like this course?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      cancelButtonText: `Close`,
    })

    if (result.isConfirmed) {
      likeCourse(courseId).then((data) => {
        if (data) {
          Swal.fire(
            {
              title: "Thank you for your feedback!",
              icon: "success",
              confirmButtonText: "Ok"
            }
          );
        }
      });
    } else if (result.isDenied) {
      Swal.fire("Thank you for your feedback!", "", "error");
    }
  }



  useEffect(() => {

    dispatch(getProfile(loggedInProfile?._id));
    getCourseById(courseId).then((data) => {
      setCourse(data);
      setVideoList(data.topics);
      setCurrentTopic(data.topics[0].topicName);

    });
    //Set if already course completed


  }, []);


  const checkCourseCompletion = () => {

    const completedCourses = loggedInProfile?.completedCourses?.find(
      (course) => course === courseId
    );

    if (!completedCourses) {
      const currentCourse = loggedInProfile?.enrolledCourses?.find(
        (course) => course.course === courseId
      );
      // console.log("currentCourse", currentCourse);

      if (currentCourse?.completedTopic?.length === videoList.length) {
        // alert("Course Completed==========");
        updateCompletedCourses(courseId).then((data) => {
          // console.log(data);
          if (data) {
            dispatch(getProfile(loggedInProfile?._id));
            displaySweetAlert()
          }
        });
      }
    }

  }

  useEffect(() => {
    if (loggedInProfile?.enrolledCourses) {
      checkCourseCompletion();
    }

  }, [loggedInProfile?.enrolledCourses]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoSelect = (index, topicName) => {
    setCurrentIndex(index);
    setCurrentTopic(topicName);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length
    );
  };

  const handleLoadedMetadata = (videoId) => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration); // Set the video duration
      setIsCompleted(checkCompleted(videoId)); // Set the video completion status
      setCurrentVideo(videoId);
    }
  };

  // Handler for when the current time updates
  const handleTimeUpdate = (videoId) => {
    const video = videoRef.current;
    // console.log(video);

    if (video) {
      // Total duration of the video
      const current = video.currentTime;
      if (!isCompleted && current / duration >= 0.8) {
        // markAsACompletedVideo
        markAsACompletedVideo(videoId);
      }
    }
  };

  const markAsACompletedVideo = (videoId) => {
    // alert("Video Completed" + videoId);
    setIsCompleted(true);
    markTopicAsCompleted(courseId, videoId).then((data) => {
      // console.log("Topi",data);
      setIsCompleted(data);
      if (data) {
        // console.log("Topic Completed", data);
        dispatch(getProfile(loggedInProfile?._id));
      }
    });
  };

  const checkCompleted = (videoId) => {
    const currentCourse = loggedInProfile.enrolledCourses?.find(
      (course) => course.course === courseId
    );
    const currentVideo = currentCourse?.completedTopic?.find(
      (video) => video === videoId
    );
    if (currentVideo) {
      return true;
    } else {
      return false;
    }
  };

  const handleEnded = () => {
    handleNext();
  };
  return (
    <div className="common-container">
      {course !== undefined ? (
        course ? (<>
          {videoList.length > 0 ?
            (<div className="text-white">
              <div className="flex mt-5 mb-5 w-full justify-center ">
                <img
                  src="/icons/playvideoicon.svg"
                  alt="icon"
                  className="w-10 h-10 mr-3"
                />
                <h1 className="h2-bold ">{course.courseName}</h1>
              </div>
              <video
                ref={videoRef}
                src={videoList[currentIndex].file}
                controls
                onLoadedMetadata={() =>
                  handleLoadedMetadata(videoList[currentIndex]._id)
                } // Fired when metadata is loaded
                onTimeUpdate={() => handleTimeUpdate(videoList[currentIndex]._id)} // Fired when the current playback position changes
                className="object-contain h-[360px] lg:h-[720px] w-[1080px]"
                onEnded={handleEnded}
              />
              <h1 className="h2-bold mt-5 mb-5 w-full justify-center flex text-white">
                {currentTopic}
              </h1>
              <div className="flex flex-row justify-between m-3 text-yellow-600">
                <button onClick={handlePrev} disabled={videoList.length <= 1}>
                  Previous
                </button>
                <button onClick={handleNext} disabled={videoList.length <= 1}>
                  Next
                </button>
              </div>
              <h2>Topics</h2>
              <ul className="flex flex-col gap-5 flex-center w-full">
                {videoList.length > 0 && videoList.map((topic, index) => {
                  const isCurrentVideo = topic._id === currentVideo; // Check if it's the current video
                  const isCompleted = checkCompleted(topic._id); // Check if the video is completed

                  const textColorClass = isCurrentVideo
                    ? "text-orange-500" // Orange for the current video
                    : isCompleted
                      ? "text-green-500" // Green for completed videos
                      : "text-white"; // White for other videos

                  return (
                    <li
                      key={index}
                      className={`flex gap-10  items-center justify-between px-5 py-1 bg-dark-3 rounded-lg w-full ${isCurrentVideo ? "border-2 border-orange-500" : ""
                        }`}
                      onClick={() => handleVideoSelect(index, topic?.topicName)}
                    >
                      <video
                        src={topic?.file}
                        className="h-[50px] object-contain rounded-sm bg-dark-4"
                      />
                      <h3 className={` ${textColorClass}`}>{topic?.topicName}</h3>
                    </li>
                  );
                })}
              </ul>
            </div>) : (
              <p>Course Is Empty</p>
            )
          }
        </>
        ) : (
          "No Course Found"
        )
      ) : (
        <div className="h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
