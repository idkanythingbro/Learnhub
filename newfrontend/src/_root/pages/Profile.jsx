import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../service/user.service";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const loggedInUserData = useSelector((state) => state.userReducer.user);
  const profileData = useSelector((state) => state.userReducer.profile);
  const dispatch = useDispatch();
  // const handelProfileData = (id) => {
  //   // console.log("getProfile", id);

  //   dispatch((id))
  // }
  useEffect(() => {
    // console.log(loggedInUserData);
    if (loggedInUserData) {
      dispatch(getProfile(loggedInUserData._id));
    }
    // getProfile(loggedInUserData._id);
  }, [loggedInUserData]);

  useEffect(() => {
    console.log(profileData);

    setProfile(profileData);
  }, [profileData]);
  return <div>Profile</div>;
};

export default Profile;
