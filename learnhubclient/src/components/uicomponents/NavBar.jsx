"use client";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  Dropdown,
  Avatar,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../service/user.service";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function signUp() {
    navigate("/sign-up");
  }
  const handelSignOut = () => {
    dispatch(logoutUser(navigate));
  };

  if (!user) {
    return (
      <Navbar fluid className="bg-[#ffad33] shadow-2xl">
        <Navbar.Brand className="" href="/">
          <img
            src="/logo.svg"
            className="mr-3 h-6 sm:h-9 dark:bg-white rounded-full p-1"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LearnHub
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkThemeToggle className="mr-5" />
          <Button onClick={signUp}>Get started</Button>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Tutorials
          </Navbar.Link>
          <Navbar.Link href="#">Exercises</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar fluid rounded className="bg-[#ffad33] shadow-xl">
      <Navbar.Brand href="/">
        <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LearnHub
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        <DarkThemeToggle className="mr-2" />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              className="m-1"
              alt="User settings"
              img={user?.avatar}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.name} </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handelSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        <Navbar.Link href="#" className="text-lg" active>
          Tutorials
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg">
          Exercises
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg">
          Services
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
