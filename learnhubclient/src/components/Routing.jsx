import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
    const [user, setUser] = useState(null);
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
                    <Route path="/" element={<ProfilePage user={user} />} />
                    <Route path="*" element={<>Not Found</>} />
                </Routes>
            </>
        )
    }

}

export default Routing