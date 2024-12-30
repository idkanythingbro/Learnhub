import { GiSpellBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { logoutUser, getLoginUserDetails } from "../../service/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Topbar = () => {
  const dispatch = useDispatch();
  const handelSignOut = () => {
    dispatch(logoutUser());
  };

  const loggedInUserData = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getLoginUserDetails());
  }, []);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/home" className="flex gap-3 items-center">
          <GiSpellBook className="bg-white rounded-full w-10 h-10" />
        </Link>
        <div className="flex gap-4">
          {/* link to profile icon on topbar */}
          <Link className="flex-center gap-3">
            <img
              src={
                loggedInUserData?.avatar ||
                "/public/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
          <img src="/icons/logout.svg" onClick={handelSignOut} />
        </div>
      </div>
    </section>
  );
};

export default Topbar;
