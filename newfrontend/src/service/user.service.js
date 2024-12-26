import axios from "axios";
import { toast } from "react-toastify";
import { errorToast } from "../utils/errorToast";
import { setLoginUser } from "../redux/reducer/auth.reducer";
import { userApiRout } from "../assets/constant";

export const registerUser = (userData, navigate) => async (_) => {
  const toastId = toast.loading("Account creating...", {
    autoClose: 1000 * 60 * 10,
  });
  try {
    const response = await axios.post(`${userApiRout}/register/`, userData);
    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success(response.data.message);
      navigate("/sign-in");
    }
    return true;
  } catch (error) {
    console.log(error);
    toast.dismiss(toastId);
    errorToast(error);
    return false;
  }
};

// export const activateAccount = async (otp, email) => {
//     try {
//         const response = await axios.post(`${userApiRout}/active-account`, { otp, email });
//         if (response.data.success) {
//             toast.success(response.data.message);
//             navigate("/")
//         }
//     } catch (error) {
//         errorToast(error);
//     }
// }

export const loginUser = (userData, navigate) => async (dispatch) => {
  const toastId = toast.loading("Logging in...", {
    autoClose: 1000 * 60 * 10,
  });
  try {
    const response = await axios.post(`${userApiRout}/login/`, userData, {
      withCredentials: true,
    });
    if (response.data.success) {
      toast.dismiss(toastId);
      dispatch(getLoginUserDetails());
      navigate("/home");
    }
  } catch (error) {
    toast.dismiss(toastId);
    errorToast(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${userApiRout}/logout/`, {
      withCredentials: true,
    });
    if (response.data.success) {
      dispatch(setLoginUser(null));
      window.location.href = "/sign-in";
    }
  } catch (error) {
    errorToast(error);
  }
};

let refreshCnt = 0;
export const getLoginUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(`${userApiRout}/me`, {
      withCredentials: true,
    });
    if (response.data.success) {
      dispatch(setLoginUser(response.data.data));
      refreshCnt = 0;
    }
  } catch (error) {
    if (
      (error.response?.status === 401 || error.code === "ERR_BAD_REQUEST") &&
      refreshCnt < 3
    ) {
      refreshCnt += 1;
      try {
        const response = await axios.get(
          `${userApiRout}/refresh-access-token/`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(getLoginUserDetails());
          return response.data;
        }
        return null;
      } catch (error) {
        // errorToast(error);
        return null;
      }
    }
  }
};

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
};

export const updateProfile = (key, value) => async (dispatch) => {
  const toastId = toast.loading("Updating...");
  try {
    const formData = new FormData();
    formData.append(key, value);

    const response = await axios.put(
      `${userApiRout}/update-profile/`,
      formData,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success(`${key} updated successfully`);
      dispatch(getLoginUserDetails());
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.log(error);

    toast.dismiss(toastId);
    errorToast(error);
    return null;
  }
};
