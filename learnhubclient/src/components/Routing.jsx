import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import { Route, Routes } from "react-router-dom";
import DashBoard from "./uicomponents/DashBoard";
import MyLearnings from "./uicomponents/MyLearnings";
import { getLoginUserDetails } from "../service/user.service";

const Routing = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getLoginUserDetails());
  }, []);

  useEffect(() => {
    setUser(loggedInUserData);
  }, [loggedInUserData]);

  if (!user) {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<ProfilePage user={user} />}>
            {/* <Route path="/" element={<DashBoard />} /> */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/my-learnings" element={<MyLearnings />} />
          </Route>

          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </>
    );
  }
};

export default Routing;
