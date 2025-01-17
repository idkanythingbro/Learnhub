import axios from "axios";
import { toast } from "react-toastify";
import { errorToast } from "../utils/errorToast";
import { setLoginUser, setProfile } from "../redux/reducer/user.reducer";
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
      navigate("/");
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
    console.log("getLoginUserDetails", userApiRout);

    const response = await axios.get(`${userApiRout}/me`, {
      withCredentials: true,
    });
    // console.log("user", response);
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

export const getProfile = (id) => async (dispatch) => {
  try {
    if (!id) {
      return null;
    }
    // let identifier = userName || id;
    const response = await axios.get(`${userApiRout}/profile`, {
      withCredentials: true,
    });
    if (response.data.success) {
      dispatch(setProfile(response.data.data));
      return response.data.data;
    }
    return null;
  } catch (error) {
    errorToast(error);
    return null;
  }
};

export const updateProfile = (userId, userDetails) => async (dispatch) => {
  const toastId = toast.loading("Updating...");
  try {
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("organization", userDetails.organization);
    formData.append("phone", userDetails.phone);
    formData.append("email", userDetails.email);
    formData.append("description", userDetails.description);
    formData.append("location", userDetails.location);
    formData.append("designation", userDetails.designation);
    formData.append("avatar", userDetails.avatar[0]);


    const response = await axios.put(`${userApiRout}/update-profile/`, formData, {
      withCredentials: true,
    }
    );

    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success(`Updated successfully`);
      dispatch(getProfile(userId));
      return response.data.data;
    }
    return false;
  } catch (error) {
    console.log(error);

    toast.dismiss(toastId);
    errorToast(error);
    return false;
  }
};

export const requestToResetPassword = async (email) => {
  console.log("requestToResetPassword", email);

  const toastId = toast.loading("Sending email...");
  try {
    const response = await axios.put(`${userApiRout}/request-reset-password/`, {
      email,
    });
    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success(response.data.message);
      return true;
    }
    return false;
  } catch (error) {
    toast.dismiss(toastId);
    errorToast(error);
    return false;
  }
};

export const resetPassword = async (token, data) => {
  const toastId = toast.loading("Resetting password...");
  try {
    const response = await axios.put(`${userApiRout}/reset-password?token=${token}`, data);
    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success(response.data.message);
      return true;
    }
    return false;
  } catch (error) {
    toast.dismiss(toastId);
    errorToast(error);
    return false;
  }
};