import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import SigninForm from "../_auth/forms/SigninForm";
import AuthLayout from "../_auth/AuthLayout";
import SignupForm from "../_auth/forms/SignupForm";
import RootLayout from "../_root/RootLayout";
import {
  Certificates,
  CourseProfile,
  CreateCourse,
  Dashboard,
  Explore,
  Home,
  MyLearnings,
  Profile,
  Settings,
  Social,
  UpdateProfile,
} from "../_root/pages";
import EditCourse from "../_root/pages/EditCourse";
import CoursePlayer from "../_root/pages/CoursePlayer";
import UserProfile from "./shared/UserProfile";
import ForgotPassword, { UpdatePassWord } from "../_auth/forms/ForgotPassword";

const Routing = () => {
  const [user, setUser] = useState(null);
  const loggedInUserData = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    setUser(loggedInUserData);
  }, [loggedInUserData]);
  if (!user) {
    return (
      <Routes>
        <Route index element={<HomeLayout />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />} />
          <Route path="sign-up" element={<SignupForm />} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
        </Route>
        <Route path="/reset-password" element={<UpdatePassWord/>} />
        <Route path="*" element={<h1 className="text-white">NOT fOUND</h1>} />
      </Routes>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mylearnings" element={<MyLearnings />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="createcourse" element={<CreateCourse />} />
          <Route path="social" element={<Social />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="updateprofile" element={<UpdateProfile />} />
          <Route path="courseprofile" element={<CourseProfile />} />
          <Route path="editprofile" element={<EditCourse />} />
          <Route path="courseplayer" element={<CoursePlayer />} />
          <Route path="userprofile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<h1 className="text-white">NOT fOUND</h1>} />
      </Routes>
    </div>
  );
};

export default Routing;
