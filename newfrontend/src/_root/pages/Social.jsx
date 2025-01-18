import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SocialPostEditor from "../../components/SocialPostEditor";
import { useClickOutside } from "../../utils/useClickOutside";
const Social = () => {
  const createPostRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const loggedInUserData = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    setUser(loggedInUserData);
  }, [loggedInUserData]);
  return (
    <div className="w-full flex flex-col  items-center p-2 ">
      <section ref={createPostRef} className=" flex gap-4 p-2">
        <div>
          <img
            src={user?.avatar}
            alt="Avatar"
            className="rounded-full h-10 w-10"
          />
        </div>
        <div>
          <div
            type="text"
            className=" border border-gray-200 bg-white p-2 rounded-3xl w-[15rem] md:w-[25rem] h-10 cursor-pointer text-gray-500 hover:bg-gray-100"
            onClick={() => setIsPostEditorOpen(true)}
          >
            What's on your mind?
            </div>
        </div>
      </section>
      {isPostEditorOpen && <section
        className="relative p-8 bg-white rounded-2xl  overflow-x-auto"
      >
        <button
          onClick={() => setIsPostEditorOpen(false)}
          className="absolute top-0 right-0 bg-red-600 text-black font-black m-1 px-2 py-2 rounded-full hover:bg-gray-300"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.78 12.72C14.07 13.01 14.07 13.49 13.78 13.78C13.63 13.93 13.44 14 13.25 14C13.06 14 12.87 13.93 12.72 13.78L8 9.06L3.28 13.78C3.13 13.93 2.94 14 2.75 14C2.56 14 2.37 13.93 2.22 13.78C1.93 13.49 1.93 13.01 2.22 12.72L6.94 8L2.22 3.28C1.93 2.99 1.93 2.51 2.22 2.22C2.51 1.93 2.99 1.93 3.28 2.22L8 6.94L12.72 2.22C13.01 1.93 13.49 1.93 13.78 2.22C14.07 2.51 14.07 2.99 13.78 3.28L9.06 8L13.78 12.72Z" fill="currentColor"></path>
          </svg>
        </button>
        <SocialPostEditor />
      </section>}
    </div>
  );
};

export default Social;
