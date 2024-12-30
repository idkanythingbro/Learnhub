import { GiSpellBook } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logoutUser, getProfile } from "../../service/user.service";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../assets/constant";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const handelSignOut = () => {
    dispatch(logoutUser());
  };

  const [profile, setProfile] = useState({});
  const loggedInUserData = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (loggedInUserData) {
      dispatch(getProfile(loggedInUserData._id));
    }
  }, [loggedInUserData]);

  const profileData = useSelector((state) => state.userReducer.profile);
  useEffect(() => {
    // console.log(profileData);

    setProfile(profileData);
  }, [profileData]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <GiSpellBook className="bg-white rounded-full w-10 h-10" />
        </Link>
        {/* link for profile page goes here */}
        <Link className="flex gap-3 items-center">
          <img
            src={profile?.avatar || "/public/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-[18px] font-bold leading-[140%] text-light-2">
              {profile?.name}
              {/* put user profile here */}
            </p>
            <p className="text-[14px] font-normal leading-[140%]  text-light-3">
              @{profile?.userName}
              {/* put username here */}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname == link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group text-white ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgUrl}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="flex h-8 w-8" onClick={handelSignOut}>
        <img src="/icons/logout.svg" />
        <p className="text-white small-medium lg:base-medium">Logout</p>
      </button>
    </nav>
  );
};

export default LeftSidebar;
