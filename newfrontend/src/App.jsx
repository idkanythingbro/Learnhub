import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import HomeLayout from "./components/HomeLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUserDetails } from "./service/user.service";
import {
  Certificates,
  CreateCourse,
  Dashboard,
  Explore,
  MyLearnings,
  Profile,
  Settings,
  Social,
  UpdateProfile,
} from "./_root/pages";
import MyDropzone from "./Test";

const App = () => {
  const loggedInUserData = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginUserDetails());
  }, []);

  useEffect(() => {
    console.log(loggedInUserData);
  }, [loggedInUserData]);
  return (
    <main className=" bg-black">
      <Routes>
        <Route index element={<HomeLayout />} />
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mylearnings" element={<MyLearnings />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/social" element={<Social />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
