import CourseForm from "../../components/forms/CourseForm";

const CreateCourse = () => {
  return (
    <div className="bg-black text-white flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/icons/createcourse.svg" alt="Add" width={36} height={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Course</h2>
        </div>
        <CourseForm />
      </div>
    </div>
  );
};

export default CreateCourse;
