import NavBar from "./NavBar";
import menu_dark from "./../assets/menu_dark.svg";
import achievement from "./../assets/achievement.svg";
import favourite from "./../assets/favorite.svg";
import search from "./../assets/search.svg";
import chat from "./../assets/chat.svg";
import group from "./../assets/group.svg";
import person_search from "./../assets/person_search.svg";
import settings from "./../assets/settings.svg";
import updates from "./../assets/updates.svg";
import work_history from "./../assets/work_history.svg";
import learning from "./../assets/book.svg";
import dashboard from "./../assets/dashboard.svg";
import { Popover, Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <NavBar user={user} />
      <div className="flex flex-row">
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
          <Link to="/dashboard">
          <Popover
            trigger="hover"
            content={<div className="dark:text-white">Dashboard</div>}
          >
            <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
              <img src={dashboard} />
            </button>
          </Popover>
          </Link>
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
            content={<div className="dark:text-white">Achievements</div>}
          >
            <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
              <img src={settings} />
            </button>
          </Popover>
        </div>
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
          <Drawer.Items></Drawer.Items>
        </Drawer>
        <div></div>
      </div>
    </div>
  );
};

export default ProfilePage;
