export const userApiRout = `${import.meta.env.VITE_SERVER_BASE_URL}/users`;

export const sidebarLinks = [
  {
    //change the route for home after
    imgUrl: "./../../public/icons/home.svg",
    route: "/dashboard",
    label: "Home",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/explore",
    label: "Explore",
  },
  //change dashborad url to /dashboard later
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/dash",
    label: "Dashboard",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/mylearnings",
    label: "My Learnings",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/certificates",
    label: "Certificates",
  },
  {
    imgUrl: "./../../public/icons/createcourse.svg",
    route: "/createcourse",
    label: "Create Course",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/social",
    label: "Social",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/settings",
    label: "Settings",
  },
];
export const bottombarLinks = [
  //change the route for home after
  {
    imgUrl: "./../../public/icons/home.svg",
    route: "/dashboard",
    label: "Home",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgUrl: "./../../public/icons/explore.svg",
    route: "/mylearnings",
    label: "My Learnings",
  },
  {
    imgUrl: "./../../public/icons/createcourse.svg",
    route: "/createcourse",
    label: "Create",
  },
];
