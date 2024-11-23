import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"

import { Route, Routes } from "react-router-dom";
import DashBoard from "./uicomponents/DashBoard";

const Routing = () => {
    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        password: null,
        role: null,
        token: null
    });
    // const loggedInUserData = useSelector(state => state.userReducer.user);
    // useEffect(() => {
    //     setUser(loggedInUserData);
    // }, [loggedInUserData])
    if (!user) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="*" element={<>Not Found</>} />
                </Routes>
            </>
        )
    }
    else {
        return (
            <>
                <Routes>
                    <Route path="/" element={<ProfilePage user={user} />} >
                        <Route path="" element={<DashBoard/>} />
                    </Route>

                    <Route path="*" element={<>Not Found</>} />
                </Routes>
            </>
        )
    }

}

export default Routing