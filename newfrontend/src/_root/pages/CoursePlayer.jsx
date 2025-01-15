import React, { useEffect, useState } from "react";
import { getCourseById } from "../../service/courses.service";

const CoursePlayer = () => {
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      setCourse(data);
    });
  }, []);

  return (<div>{
    course !== undefined ? (
      course ? (
        <div className="text-white">
          {/* <h1>{course.courseName}</h1>
          <video src={course.introVideo} controls></video> */}
          {/* {
            JSON.stringify(course)
          } */}
          <h1>{course.courseName}</h1>
          <video src={course.introVideo} controls></video>
          <h2>Topic</h2>
          <ul>
            {
              course?.topics?.map((topic, index) => {
                // console.log(topic);
                
                return (
                  <li key={index}>
                    <h3>{topic.topicName}</h3>
                    <video src={topic.file} controls></video>
                  
                  </li>
                );
              })
            }
          </ul>
        </div>
      ) : "No Course Found"
    ) : "Loading..."
  }</div>);
};

export default CoursePlayer;
