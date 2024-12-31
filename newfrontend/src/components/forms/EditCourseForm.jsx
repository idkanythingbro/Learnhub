import { Controller, useForm } from "react-hook-form";
import FileUploader from "../shared/FileUploader";
import VideoUploader from "../shared/VideoUploader";
const EditCourseForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Course Name</label>
        <input
          {...register("courseName")}
          type="text"
          placeholder=""
          name="courseName"
          id="courseName"
          className="p-2 h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 rounded"
        />
        <p className="text-rose-400">{errors.courseName?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Description</label>
        <textarea
          {...register("description")}
          type="text"
          placeholder="description...."
          name="description"
          id="description"
          className="p-2 custom-scrollbar h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
        />
        <p className="text-rose-400">{errors.description?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Poster</label>
        <div className="flex flex-center flex-col bg-dark-3 rounded-xl ">
          <div className="file_uploader-box ">
            <img
              src="/icons/cloud.svg"
              alt=""
              className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
            />
          </div>
          <input {...register("poster")} type="file"/>
        </div>
      </div>
    </form>
  );
};

export default EditCourseForm;
