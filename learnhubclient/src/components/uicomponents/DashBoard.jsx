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

import { Popover } from "flowbite-react";

import copy from "./../../assets/copy.svg";
import edit from "./../../assets/edit.svg";
const DashBoard = () => {
  const goalsList = [
    { id: 1, goal: "Learn ReactJs" },
    { id: 2, goal: "Learn Flutter" },
    { id: 3, goal: "Earn 1000000" },
    { id: 4, goal: "Complete Project" },
    { id: 5, goal: "Buy a Bike" },
  ];

  const goals = goalsList.map((item) => {
    return (
      <li key={item.id} className="border-2 rounded">
        <p className="text-base font-semibold">{item.goal}</p>{" "}
        <div className="flex justify-center items-center gap-3">
          <input type="checkbox" className="" />
          <p>Mark as Done</p>
        </div>
      </li>
    );
  });

  return (
    <div className="flex flex-col h-full w-full p-2">
      <div className="flex lg:flex-row flex-col p-2 shadow-lg gap-2 dark:bg-slate-800 overflow-scroll scrollbar-hidden">
        <div className="flex justify-center items-center flex-col rounded-md shadow-lg p-1 dark:bg-slate-800">
          <div className="w-full flex justify-end">
            <img src={edit} alt="Edit" />
          </div>
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

        <div className="relative lg:w-[20%] w-full rounded-md p-4 justify-center dark:bg-slate-800">
          <q className="text-md font-semibold dark:text-white italic">
            {userdescription}
          </q>
          <button className="absolute right-0 top-0">
            <img src={edit} alt="Edit" />
          </button>
        </div>
        <div className="flex flex-col flex-grow md:w-[50%] w-full gap-4 pl-2 justify-center dark:text-white">
          <span className="relative font-semibold text-lg shadow-sm w-full">
            <div className="flex items-center">
              Name : {userName}{" "}
              <button className="absolute right-0">
                <img src={edit} alt="Edit" className="" />
              </button>
            </div>
          </span>
          <span className="font-semibold text-lg shadow-sm w-full">
            Organization Name : {orgName}
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
      <div className="flex flex-col lg:flex-row h-[40%] gap-4 mt-1 mb-1 ">
        <div className="w-full lg:w-[20%] border-2 rounded-2xl dark:bg-slate-800">
          <div className="text-2xl font-bold flex justify-center p-2 text-[#ffad33] dark:text-white">
            Long Term Goals
          </div>
          <ul className="flex justify-center flex-col dark:text-white p-2 gap-2">
            {goals}
          </ul>
        </div>
        <div className="w-full lg:w-[20%] border-2 rounded-2xl dark:bg-slate-800">
          <div className="text-2xl font-bold flex justify-center p-2 text-[#ffad33] dark:text-white">
            Yearly Goals
          </div>
          <ul className="flex justify-center flex-col dark:text-white p-2 gap-2">
            {goals}
          </ul>
        </div>
        <div className="w-full lg:w-[20%] border-2 rounded-2xl dark:bg-slate-800">
          <div className="text-2xl font-bold flex justify-center p-2 text-[#ffad33] dark:text-white">
            Monthly Goals
          </div>
          <ul className="flex justify-center flex-col dark:text-white p-2 gap-2">
            {goals}
          </ul>
        </div>
        <div className="w-full lg:w-[20%] border-2 rounded-2xl dark:bg-slate-800">
          <div className="text-2xl font-bold flex justify-center p-2 text-[#ffad33] dark:text-white">
            Weekly Goals
          </div>
          <ul className="flex justify-center flex-col dark:text-white p-2 gap-2">
            {goals}
          </ul>
        </div>
        <div className="w-full lg:w-[20%] border-2 rounded-2xl dark:bg-slate-800">
          <div className="text-2xl font-bold flex justify-center p-2 text-[#ffad33] dark:text-white">
            Daily Goals
          </div>
          <ul className="flex justify-center flex-col dark:text-white p-2 gap-2">
            {goals}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
