import { Popover } from "flowbite-react";
import menu_dark from "./../../assets/menu_dark.svg";
import dashboard from "./../../assets/dashboard.svg";
import learning from "./../../assets/book.svg";
import achievement from "./../../assets/achievement.svg";
import search from "./../../assets/search.svg";
import favourite from "./../../assets/favorite.svg";
import person_search from "./../../assets/person_search.svg";
import chat from "./../../assets/chat.svg";
import group from "./../../assets/group.svg";
import work_history from "./../../assets/work_history.svg";
import updates from "./../../assets/updates.svg";
import settings from "./../../assets/settings.svg";

const sidebar = ({ setIsOpen }) => {
  return (
    <div className="flex flex-col gap-2 h-screen dark:bg-slate-800 p-2 shadow-inner border-black">
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Menu</div>}
      >
        <button
          className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <img src={menu_dark} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Dashboard</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={dashboard} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">My Learnings</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={learning} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Achievements</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={achievement} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Favourites</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={favourite} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Search</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={search} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Search Someone</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={person_search} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Chats</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={chat} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Groups</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={group} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">History</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={work_history} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Updates</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={updates} />
        </button>
      </Popover>
      <Popover
        trigger="hover"
        content={<div className="dark:text-white">Settings</div>}
      >
        <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
          <img src={settings} />
        </button>
      </Popover>
    </div>
  );
};

export default sidebar;
