import NavBar from "../uicomponents/NavBar";
import { Button, Drawer, TextInput } from "flowbite-react";
import { useState } from "react";
import Sidebar from "../uicomponents/sidebar";
// import DashBoard from "../uicomponents/DashBoard";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const navigator = useNavigate();
  return (
    <div>
      <NavBar user={user} />
      <div className="flex flex-row">
        <Sidebar setIsOpen={setIsOpen} />
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
          <Drawer.Items className="flex flex-col gap-4">
            {/* //REVIEW - add onClick to navigate to dashboard and every other path */}
            <Button onClick={() => navigator("/")} className="w-full">Dashoard</Button>
            <Button className="w-full">My Learning </Button>
            <Button className="w-full">Achievements</Button>
            <Button className="w-full">Favourites</Button>
            <Button className="w-full">Search</Button>
            <Button className="w-full">Serach Someone</Button>
            <Button className="w-full">Chats</Button>
            <Button className="w-full">Groups</Button>
            <Button className="w-full">History</Button>
            <Button className="w-full">Updates</Button>
            <Button className="w-full">Settings</Button>
            <a href="/" className="flex justify-center items-center">
              <img
                src="/logo.svg"
                className="mr-3 h-6 sm:h-9 dark:bg-white rounded-full p-1"
                alt="Logo"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                LearnHub
              </span>
            </a>
          </Drawer.Items>
        </Drawer>

        <div className="w-full">
          {/* <DashBoard /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
