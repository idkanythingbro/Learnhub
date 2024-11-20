import axios from "axios";
import { userApiRout } from "../assets/constant";
import { setLoginUser } from "../redux/reducer/auth.reducer";
import { navigate } from "../App";
import { toast } from "react-toastify";
import { errorToast } from "../utils/errorToast";

export const registerUser = (userData) => async (_) => {
    const toastId = toast.loading("Account creating...", {
        autoClose: 1000 * 60 * 10
    })
    try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("phoneNumber", userData.phoneNumber);
        formData.append("password", userData.password);
        formData.append("role", userData.role);
        formData.append("bio", userData.bio);
        formData.append("experience", userData.experience);
        formData.append("avatar", userData.profilePicture);

        const response = await axios.post(`${userApiRout}/register/`, formData);
        if (response.data.success) {
            navigate("/active", { state: { email: userData.email } })
            toast.dismiss(toastId)
            toast.success(response.data.message);
        }

    } catch (error) {
        toast.dismiss(toastId)
        errorToast(error);
    }
}

export const activateAccount = async (otp, email) => {
    try {
        const response = await axios.post(`${userApiRout}/active-account`, { otp, email });
        if (response.data.success) {
            toast.success(response.data.message);
            navigate("/")
        }
    } catch (error) {
        errorToast(error);
    }
}

export const loginUser = (userData) => async (dispatch) => {
    const toastId = toast.loading("Logging in...", {
        autoClose: 1000 * 60 * 10
    })
    try {
        const response = await axios.post(`${userApiRout}/login/`, userData, {
            withCredentials: true
        });
        if (response.data.success) {
            toast.dismiss(toastId)
            dispatch(getLoginUserDetails());

        }
    } catch (error) {
        toast.dismiss(toastId)
        errorToast(error);
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${userApiRout}/logout/`, {
            withCredentials: true
        });
        if (response.data.success) {
            dispatch(setLoginUser(null));
            navigate("/");
        }
    } catch (error) {
        errorToast(error);
    }
}
let refreshCnt = 0;
export const getLoginUserDetails = () => async (dispatch) => {
    try {
        const response = await axios.get(`${userApiRout}/me`, {
            withCredentials: true
        });
        if (response.data.success) {
            dispatch(setLoginUser(response.data.data));
            refreshCnt = 0;
        }

    } catch (error) {
        if ((error.response?.status === 401 || error.code === "ERR_BAD_REQUEST") && refreshCnt < 3) {
            refreshCnt += 1;
            try {
                const response = await axios.get(`${userApiRout}/refresh-access-token/`, {
                    withCredentials: true
                })
                if (response.data.success) {
                    dispatch(getLoginUserDetails());
                    return response.data
                }
                return null;

            } catch (error) {
                errorToast(error);
                return null;
            }
        }

    }
}

export const getProfile = async (userName, id) => {
    try {
        if (!userName && !id) {
            return null;
        }
        let identifier = userName || id;
        const response = await axios.get(`${userApiRout}/${identifier}`);
        if (response.data.success) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        errorToast(error);
        return null;
    }
}

export const updateProfile = (key, value) => async (dispatch) => {
    const toastId = toast.loading("Updating...",)
    try {
        const formData = new FormData();
        formData.append(key, value);

        const response = await axios.put(`${userApiRout}/update-profile/`, formData, {
            withCredentials: true
        });
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(`${key} updated successfully`);
            dispatch(getLoginUserDetails());
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        
        toast.dismiss(toastId)
        errorToast(error);
        return null;
    }
}
