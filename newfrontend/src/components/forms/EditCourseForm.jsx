import { Controller, useForm } from "react-hook-form";
import { getCourseById } from "../../service/courses.service";
import VideoUploader from "../shared/VideoUploader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const EditCourseForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputVdValue, setInputVdValue] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      console.log(data);

      setCourse(data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: course?.description,
      courseName: course?.courseName,
      poster: course?.poster,
      introVideo: course?.introVideo,
      prerequsite: course?.prerequsite,
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleImgInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Make the image visible
        setInputValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleVdInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Make the image visible
        setInputVdValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //   console.log(inputValue);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9 w-full max-w-5xl">
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Course Name</label>
        <input
          {...register("courseName")}
          type="text"
          placeholder={course?.courseName}
          name="courseName"
          id="courseName"
          className="p-2 h-12 bg-dark-4 border-none placeholder:text-light-2 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 rounded"
        />
        <p className="text-rose-400">{errors.courseName?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Description</label>
        <textarea
          {...register("description")}
          type="text"
          placeholder={course?.description}
          name="description"
          id="description"
          className="p-2 custom-scrollbar h-36 bg-dark-3 rounded-xl border-none placeholder:text-light-2 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
        />
        <p className="text-rose-400">{errors.description?.message}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Poster</label>
        <div className="flex flex-center flex-col bg-dark-3 rounded-xl ">
          <div className="file_uploader-box ">
            <img
              src={inputValue || course?.poster}
              alt=""
              className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
            />
            <input
              {...register("poster")}
              type="file"
              accept=".jpg, .jpeg, .png, .svg"
              id="poster"
              name="poster"
              onChange={handleImgInputChange}
              className="file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-gray-800 file:text-gray-200
               file:hover:bg-gray-700
               hover:cursor-pointer
               text-sm text-gray-400
               bg-gray-800 rounded-md border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit Poster</label>
        <div className="flex flex-center flex-col bg-dark-3 rounded-xl ">
          <div className="file_uploader-box ">
            <video
              src={inputVdValue || course?.introVideo}
              alt=""
              className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
            />
            <input
              {...register("introVideo")}
              type="file"
              accept="video/*"
              id="poster"
              name="poster"
              onChange={handleVdInputChange}
              className="file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-gray-800 file:text-gray-200
               file:hover:bg-gray-700
               hover:cursor-pointer
               text-sm text-gray-400
               bg-gray-800 rounded-md border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCourseForm;
