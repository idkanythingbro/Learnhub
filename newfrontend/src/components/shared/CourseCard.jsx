/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/utils";
import LikeButton from "./LikeButton";

const CourseCard = ({ course }) => {
  // console.log(course);
  return (
    <Link to={`/courseprofile?courseId=${course._id}`}>
      <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
        <div className="flex-between">
          <div className="flex flex-col w-full">
            <div className="w-full flex justify-center items-center">
              <img
                src={course.poster || "/icons/cloud.svg"}
                alt="course poster"
                className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
              />
            </div>
            {/* have to change the link here to go the course profile */}

            <p className="text-light-2">{course.courseName}</p>

            <div className="flex flex-col">
              <p className="text-light-4 small-regular">
                created by {course.owner?.name}
              </p>
              <p className="text-light-4 small-regular mb-6">
                {timeAgo(course.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-light-2 small-regular mb-6">
                {course.description}
              </p>
            </div>
          </div>
        </div>
        <LikeButton likes={course.likes?.length} />
      </div>
    </Link>
  );
};

export default CourseCard;
