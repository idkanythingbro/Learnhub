import { toast } from "react-toastify";

export const errorToast = (error) => {
    let message = error?.response?.data?.message||error?.message||"Something went wrong";
    toast.error(message,{autoClose:3000});
}