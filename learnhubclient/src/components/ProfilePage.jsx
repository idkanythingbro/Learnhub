import NavBar from "./NavBar";
import menu_dark from "./../assets/menu_dark.svg";
import achievement from "./../assets/achievement.svg";
import { Popover } from "flowbite-react";

const ProfilePage = ({ user }) => {
  return (
    <div>
      <NavBar user={user} />
      <div className="flex flex-row">
        <div className="flex flex-col gap-2 h-screen dark:bg-slate-800 p-2 shadow-inner border-black">
          <Popover trigger="hover" content={<div>Menu</div>}>
            <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg">
              <img src={menu_dark} alt="MENU" />
            </button>
          </Popover>
          <Popover trigger="hover" content={<div>Achievements</div>}>
            <button className="flex p-2 shadow-md rounded-md dark:bg-white hover:shadow-lg    ">
              <img src={achievement} alt="MENU" />
            </button>
          </Popover>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfilePage;
