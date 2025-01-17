import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../service/user.service";

const Settings = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [profile, setProfile] = useState({});
  const loggedInUserData = useSelector((state) => state.userReducer.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      organization: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (loggedInUserData) {
      dispatch(getProfile(loggedInUserData._id));
    }
  }, [loggedInUserData]);

  const profileData = useSelector((state) => state.userReducer.profile);
  useEffect(() => {
    // console.log(profileData);
    setProfile(profileData);
    //Reset the register
    if (formRef.current) {
      formRef.current.reset();
    }

  }, [profileData]);


  //here is onSubmit function
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    dispatch(updateProfile(loggedInUserData._id, data));
  });

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Make the image visible
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="common-container text-white">
      <div className="flex flex-row">
        <img src="/icons/edit.svg" alt="edit" className="w-10 h-10" />
        <h2 className="h2-bold">Edit Profile</h2>
      </div>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row flex-1 gap-5 mt-4 "
      >
        <div className="flex flex-col w-full justify-center items-center gap-3">
          <img
            src={photo || profile?.avatar}
            alt="photo"
            className="object-cover w-[400px] h-[400px] rounded-full border-2"
          />
          <label htmlFor="profilephoto" className="text-center">
            Upload Photo
          </label>
          <input
            {...register("avatar")}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="p-2 bg-gray-700  rounded-md w-full"
          />
        </div>
        <div className="flex flex-col gap-3 flex-center w-full lg:w-[700px]">
          <div className="w-full">
            <label htmlFor="firstname"> Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder={profile?.name}
              className="p-2 bg-gray-700  rounded-md w-full"
            />
          </div>

          <div className="w-full">
            <label htmlFor="organization" className="text-white">
              Organization Name
            </label>
            <input
              {...register("organization")}
              type="text"
              placeholder={profile?.organization}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="text-white">
              Phone
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder={profile?.phone}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder={profile?.email}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              Designation
            </label>
            <input
              {...register("designation")}
              type="text"
              placeholder={profile?.designation}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder={profile?.location}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              About Yourself
            </label>
            <textarea
              {...register("description")}
              className="p-2 bg-gray-700 text-white rounded-md w-full"
              rows={7}
              placeholder={profile?.description}
            />
          </div>

          <div className="flex items-center gap-4 justify-end">
            <button
              type="submit"
              className="text-light-1 bg-yellow-700 h-12 w-24 rounded whitespace-nowrap"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
