import {
  usertag,
  userdescription,
  userName,
  userEmail,
  userDesignation,
  userPhone,
  userLocation,
  orgName,
} from "../../assets/constant";
import copy from "./../../assets/copy.svg";
const DashBoard = () => {
  return (
    <div className="flex flex-col h-full w-full p-2">
      <div className="flex lg:flex-row flex-col h-[50%] lg:h-1/3 p-2 shadow-lg gap-2 dark:bg-slate-800 overflow-scroll scrollbar-hidden">
        <div className="flex justify-center items-center flex-col rounded-md shadow-lg p-1 dark:bg-slate-800">
          <img
            className="bg-black rounded-full w-[150px] md:w-[200px] lg:w-[225px] h-[150px] md:h-[200px] lg:h-[225px] m-auto object-contain border-1 border-solid"
            src="/src/assets/luffy.jfif"
            alt="Profile"
          />
          <div className="flex justify-center items-center p-2">
            <span className="md:text-xl font-light dark:text-white flex justify-center items-center italic w-full">
              {usertag}
              <button className="p-1 dark:bg-white w-7 rounded-full ml-2">
                <img src={copy} alt="copy" className="" />
              </button>
            </span>
          </div>
        </div>

        <div className="lg:w-[20%] w-full rounded-md p-4 justify-center dark:bg-slate-800">
          <q className="text-md font-semibold dark:text-white italic">
            {userdescription}
          </q>
        </div>
        <div className="flex flex-col flex-grow md:w-[50%] w-full gap-4 pl-2 justify-center dark:text-white">
          <span className="font-semibold text-lg shadow-sm w-full">
            Name : {userName}
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Organization Name {orgName}:{" "}
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Email : {userEmail}
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Phone : {userPhone}
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Location : {userLocation}
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Designation : {userDesignation}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row h-[40%]">
        <div className="w-full lg:w-[20%] ">Long Term Goals</div>
        <div className="w-full lg:w-[20%] ">Yearly Goals</div>
        <div className="w-full lg:w-[20%] ">Monthly Goals</div>
        <div className="w-full lg:w-[20%] ">Weekly Goals</div>
        <div className="w-full lg:w-[20%] ">Todays Goals</div>
      </div>
    </div>
  );
};

export default DashBoard;
