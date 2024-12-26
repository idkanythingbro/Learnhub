import { GiSpellBook } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/user.service";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => dispatch(loginUser(data, navigate)));

  const loginwithgoogle = () => {
    // alert("Login with Google")
    window.open("http://localhost:5001/auth/google/callback", "_self");
  };
  const loginwithgithub = () => {
    // alert("Login with Github")
    window.open("http://localhost:5001/login/oauth/authorize", "_self");
  };

  return (
    <div>
      <div className="sm:w-[420px] flex-center flex-col">
        <Link to="/" className="flex gap-3 items-center">
          <GiSpellBook className="bg-white rounded-full w-10 h-10" />
        </Link>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white">
          SignIn to LearnHub
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full mt-4">
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
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-violet-500 p-2 rounded-full"
          >
            Submit
          </button>
          <p className="text-small-regular text-white text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-violet-500 ml-1 text-small-semibold"
            >
              SignUp
            </Link>
          </p>
        </form>
        <div className="flex gap-5 mt-10">
          <button
            onClick={loginwithgithub}
            className="flex cursor-pointer gap-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black px-7 py-3 font-semibold text-white duration-200 hover:scale-105 hover:border-gray-800 hover:from-black hover:to-gray-900 hover:text-gray-500"
          >
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              ></path>
            </svg>
            Github
          </button>
          <button
            onClick={loginwithgoogle}
            className="flex cursor-pointer gap-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black px-7 py-3 font-semibold text-white duration-200 hover:scale-105 hover:border-gray-800 hover:from-black hover:to-gray-900 hover:text-gray-500"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="-3 0 262 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              fill="#000000"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                ></path>
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                ></path>
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                ></path>
              </g>
            </svg>{" "}
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
