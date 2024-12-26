import { useForm } from "react-hook-form";
import { GiSpellBook } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./../../service/user.service";
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) =>
    dispatch(registerUser(data, navigate))
  );
  return (
    <div>
      <div className="sm:w-[420px] flex-center flex-col">
        <div className="flex gap-4">
          <Link to="/" className="flex gap-3 items-center">
            <GiSpellBook className="bg-white rounded-full w-10 h-10" />
          </Link>
          <h2 className="h3-bold md:h2-bold text-white">SignUp to LearnHub</h2>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full mt-4">
          <div className="flex justify-between gap-5">
            <div className="w-full">
              <label htmlFor="firstname" className="text-white">
                First Name
              </label>
              <input
                {...register("firstname", { required: "This is required" })}
                type="text"
                placeholder="first name"
                className="p-2 bg-gray-700 text-white rounded-md"
              />
              <p className="text-white">{errors.firstname?.message}</p>
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-white">
                Last Name
              </label>
              <input
                {...register("lastname", { required: "This is required" })}
                type="text"
                placeholder="last name"
                className="p-2 bg-gray-700 text-white rounded-md"
              />
              <p className="text-white">{errors.lastname?.message}</p>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="organization" className="text-white">
              Organization Name
            </label>
            <input
              {...register("organization", {
                required: "This is required",
              })}
              type="text"
              placeholder="Eg: College, Company, Private, etc"
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
            <p className="text-red-300">{errors.organization?.message}</p>
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="text-white">
              Phone
            </label>
            <input
              {...register("phone", {
                required: "This is required",
              })}
              type="tel"
              placeholder="11 222 3445"
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
            <p className="text-red-300">{errors.phone?.message}</p>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              {...register("email", {
                required: "This is required",
              })}
              type="email"
              placeholder="abc@abc.com"
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
            <p className="text-red-300">{errors.email?.message}</p>
          </div>
          <div className="w-full">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              {...register("password", {
                required: "This is required",
              })}
              type="password"
              placeholder="*********"
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
            <p className="text-red-300">{errors.password?.message}</p>
          </div>
          <div className="w-full">
            <label htmlFor="confirmpassword" className="text-white">
              Confirm Password
            </label>
            <input
              {...register("confirmpassword", {
                required: "This is required",
                validate: (value) =>
                  value === watch("password") || "Password dont match",
              })}
              type="password"
              placeholder="*********"
              className="p-2 bg-gray-700 text-white rounded-md w-full"
            />
            <p className="text-red-300">{errors.confirmpassword?.message}</p>
          </div>
          <div className="flex items-start ">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-violet-500 p-2 rounded-full"
          >
            Submit
          </button>
          <p className="text-small-regular text-white text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-violet-500 ml-1 text-small-semibold"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
