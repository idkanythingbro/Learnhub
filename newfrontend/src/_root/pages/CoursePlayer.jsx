import { useEffect, useState } from "react";
import { getCourseById } from "../../service/courses.service";
import Loader from "./../../components/shared/Loader";

const CoursePlayer = () => {
  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      setCourse(data);
      setVideoList(data.topics);
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoSelect = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length
    );
  };

  const handleEnded = () => {
    handleNext();
  };
  return (
    <div className="common-container">
      {course !== undefined ? (
        course ? (
          <div className="text-white">
            <h1 className="h2-bold mt-5 mb-5 w-full justify-center flex">
              {course.courseName}
            </h1>
            <video
              src={videoList[currentIndex].file}
              controls
              className="object-contain h-[360px] lg:h-[720px] w-[1080px]"
              onEnded={handleEnded}
            />
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
              {console.log(videoList)}
              {videoList.map((topic, index) => {
                return (
                  <li
                    key={index}
                    className="flex gap-10  items-center justify-between px-5 py-1 bg-dark-3 rounded-lg w-full"
                    onClick={() => handleVideoSelect(index)}
                  >
                    <video
                      src={topic.file}
                      className="h-[50px] object-contain rounded-sm bg-dark-4"
                    />
                    <h3>{topic.topicName}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
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
