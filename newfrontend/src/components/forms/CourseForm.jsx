import { Controller, useForm } from "react-hook-form";
import FileUploader from "../shared/FileUploader";
import VideoUploader from "../shared/VideoUploader";
import { createNewCourse } from "../../service/courses.service";

const CourseForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      poster: {},
      courseName: "",
      introVideo: {},
      prerequsite: "",
    },
  });
  // here is the data of the form
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    createNewCourse(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Course Name</label>
        <input
          {...register("courseName", { required: "This is required" })}
          type="text"
          placeholder=""
          name="courseName"
          id="courseName"
          className="p-2 h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 rounded"
        />
        <p className="text-rose-400">{errors.courseName?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Description</label>
        <textarea
          {...register("description", { required: "This is required" })}
          type="text"
          placeholder="description...."
          name="description"
          id="description"
          className="p-2 custom-scrollbar h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
        />
        <p className="text-rose-400">{errors.description?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Add Poster</label>
        <Controller
          control={control}
          name="poster"
          render={({ field }) => <FileUploader fieldChange={field.onChange} />}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Prerequsite</label>
        <textarea
          {...register("prerequsite", { required: "This is required" })}
          type="text"
          placeholder="HTML, CSS, ReactJs .............."
          name="prerequsite"
          id="prerequsite"
          className="p-2 custom-scrollbar h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
        />
        <p className="text-rose-400">{errors.prerequsite?.message}</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Add Introduction Video</label>
        <Controller
          control={control}
          name="introVideo"
          render={({ field }) => <VideoUploader fieldChange={field.onChange} />}
        />
      </div>
      <div className="flex items-center gap-4 justify-end">
        <button
          type="submit"
          className="text-light-1 bg-violet-500 h-12 w-24 rounded whitespace-nowrap"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
