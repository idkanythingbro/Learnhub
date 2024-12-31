import { useLocation } from "react-router-dom";
import EditCourseForm from "../../components/forms/EditCourseForm";

const EditCourse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  // console.log(courseId);
  return (
    <div className="bg-black text-white flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/icons/edit.svg" alt="Add" width={36} height={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Course</h2>
        </div>
        <EditCourseForm />
      </div>
    </div>
  );
};

export default EditCourse;
