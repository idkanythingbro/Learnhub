/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../service/courses.service";
import { timeAgo } from "../../utils/utils";
import Button from "./Button";
import Swal from 'sweetalert2/dist/sweetalert2.js'
const EditCourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const handelCourseDelete = async () => {
    const response = await Swal.fire({
      title: "Are you sure you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (response.isConfirmed) {
      // Delete course
      // alert('Course Deleted')
      dispatch(deleteCourse(course._id));
    }
  };
  return (
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

          <p className="text-light-2">{course.courseName}</p>

          <div className="flex flex-col">
            <p className="text-light-4 small-regular mb-6">
              {timeAgo(course.createdAt)}
            </p>
          </div>
          <div className="flex-between">
            <Button
              title="Edit"
              id="edit"
              routepath={`/editprofile?courseId=${course._id}`}
            />
            <button
              title="Delete"
              className=" text-white rounded-3xl px-4 py-2 border  border-red hover:bg-red"
              onClick={handelCourseDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseCard;
