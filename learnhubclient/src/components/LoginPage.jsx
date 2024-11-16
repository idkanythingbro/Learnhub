"use client";
import { Button, Checkbox, Label, List, DarkThemeToggle } from "flowbite-react";

const LoginPage = () => {
  return (
    <div>
      <nav className="bg-[#ffad33] shadow-2xl border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              LearnHub
            </span>
          </a>
          <div className="font-semibold text-md flex items-center space-x-3 rtl:space-x-reverse">
            <DarkThemeToggle className="" />
            <a
              //add telephone number here
              href="tel:5541251234"
              className="text-gray-500 dark:text-white hover:underline"
            >
              (+00) 412-1234
            </a>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Signup
            </a>
          </div>
        </div>
      </nav>
      <div className="flex h-screen w-screen flex-col md:flex-row dark:bg-slate-700">
        <div className="flex w-screen flex-col items-center justify-center gap-2 md:h-screen md:w-1/2 dark:bg-slate-700">
          <form className="m-2 flex w-full flex-col gap-4 rounded-2xl border-2 border-[#ffad33] px-6 py-8 md:w-1/2 dark:bg-slate-700">
            <Label className="text-lg text-[#ffad33]">
              Sign in to Continue with LearnHub
            </Label>
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Email
                </label>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="">
                  Remember me
                </Label>
              </div>
              <a
                className="flex text-sm text-blue-700 dark:text-slate-400 dark:underline"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <Button type="submit">Submit</Button>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <a
                className="text-sm text-blue-700 dark:text-slate-400 dark:underline"
                href="#"
              >
                SignUp
              </a>
            </p>
          </form>
          <Label className="text-lg">Our Other Sign in Options</Label>
          <button className="flex cursor-pointer gap-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black px-7 py-3 font-semibold text-white duration-200 hover:scale-105 hover:border-gray-800 hover:from-black hover:to-gray-900 hover:text-gray-500">
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
          <button className="flex cursor-pointer gap-3 rounded-full border border-gray-600 bg-gradient-to-r from-gray-800 to-black px-7 py-3 font-semibold text-white duration-200 hover:scale-105 hover:border-gray-800 hover:from-black hover:to-gray-900 hover:text-gray-500">
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
        <div className="hidden h-1/2 w-screen flex-col items-center  gap-2 p-5 md:mt-10 md:flex  md:h-screen md:w-1/2 md:p-20 dark:bg-slate-700">
          <Label className="text-5xl">LearnHub</Label>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            At LearnHub, we are dedicated to empowering college students with
            accessible, engaging, and effective learning tools. Our platform
            offers a wide range of resources designed to support students at
            every stage of their academic journey. With interactive lessons,
            study materials, and collaborative tools, we make learning a
            personalized experience that’s both comprehensive and enjoyable.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Why Choose LearnHub?
          </p>
          <List>
            <List.Item>
              Comprehensive Content: From core subjects to specialized courses,
              find materials that fit your curriculum and learning goals.
            </List.Item>
            <List.Item>
              Interactive Learning: Engage with content through quizzes, videos,
              and real-time discussions, making study sessions more productive.
            </List.Item>
            <List.Item>
              Peer Collaboration: Connect and collaborate with classmates, form
              study groups, and work together on assignments.
            </List.Item>
            <List.Item>
              Expert Support: Access guidance from instructors and professionals
              to deepen your understanding and clarify any doubts.
            </List.Item>
          </List>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Whether you&apos;re aiming to ace your exams or build a strong
            foundation in your field, LearnHub is here to support your academic
            success.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <a
              className="text-sm text-blue-700 dark:text-slate-400 dark:underline"
              href="#"
            >
              Join Today!
            </a>{" "}
            Start your learning journey with us and unlock your full potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
