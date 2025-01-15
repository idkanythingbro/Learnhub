import { useForm } from "react-hook-form";
import { getCourseById, updateCourse } from "../../service/courses.service";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const EditCourseForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputVdValue, setInputVdValue] = useState("");
  const [videos, setVideos] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState(undefined);
  useEffect(() => {
    getCourseById(courseId).then((data) => {
      // console.log(data);
      setCourse(data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      courseName: "",
      poster: {},
      introVideo: {},
      prerequsite: "",
    },
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

  const watchedVideos = watch("videos");
  const onDrop = (acceptedFiles) => {
    const videoFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setVideos((prev) => [...prev, ...videoFiles]);
    setValue("videos", [...(watchedVideos || []), ...videoFiles], {
      shouldValidate: true,
    });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [".mp3", ".mp4"] },
    multiple: true,
    onDrop,
  });
  const handleNameChange = (index, newName) => {
    const updatedVideos = videos.map((video, idx) =>
      idx === index ? { ...video, name: newName } : video
    );
    setVideos(updatedVideos);
    setValue("videos", updatedVideos, { shouldValidate: true });
  };
  const handleRemove = (index) => {
    const updatedVideos = videos.filter((_, idx) => idx !== index);
    setVideos(updatedVideos);
    setValue("videos", updatedVideos, { shouldValidate: true });
  };

  const onSubmit = handleSubmit((data) => {
    updateCourse(courseId, data);
  });
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
              className="input-video-box"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Prerequsite</label>
        <textarea
          {...register("prerequsite")}
          type="text"
          placeholder={course?.prerequsite}
          name="prerequsite"
          id="prerequsite"
          className="p-2 custom-scrollbar h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Edit IntroVideo</label>
        <div className="flex flex-center flex-col bg-dark-3 rounded-xl ">
          <div className="file_uploader-box ">
            <video
              src={inputVdValue || course?.introVideo}
              alt=""
              className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
              controls
            />
            <input
              {...register("introVideo")}
              type="file"
              accept="video/*"
              id="introVideo"
              name="introVideo"
              onChange={handleVdInputChange}
              className="input-video-box"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white">Add Videos</label>
        <div className="flex flex-center flex-col bg-dark-3 rounded-xl ">
          {" "}
          <div className="file_uploader-box ">
            {" "}
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                cursor: "pointer",
              }}
              className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
            >
              <input {...getInputProps()} className="cursor-pointer" />
              <p>Drag & drop videos here, or click to select files</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h3>Uploaded Videos</h3>
        <div>
          {videos.length === 0 && (
            <div className="bg-dark-3 p-3 rounded">
              <div className="flex gap-10 items-center bg-dark-3 m-4">
                No Videos uploaded yet
              </div>
            </div>
          )}
          {videos.length > 0 && (
            <div>
              <ul className="bg-dark-3 p-3 rounded">
                {videos.map((video, index) => (
                  <li key={index}>
                    <div className="flex gap-10 items-center bg-dark-3 m-4">
                      <video
                        className="h-64 xs:h-[400px] lg:h-[250px] w-full rounded-[24px] object-contain mb-5"
                        controls
                      >
                        <source src={video.preview} type={video.file.type} />
                        Your browser does not support the video tag.
                      </video>
                      <input
                        type="text"
                        value={video.name}
                        onChange={(e) =>
                          handleNameChange(index, e.target.value)
                        }
                        className=" p-2  h-[30px] bg-dark-3 rounded w-full mr-7"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="ml-[10px] bg-[#ff4d4f] text-white border-none py-[5px] px-[10px] cursor-pointer rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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

export default EditCourseForm;
