import axios from "axios";
import { toast } from "react-toastify";
import { removeDeletedPost, singlePostUpdate, updatePost, updatePostFeedback } from "../redux/reducer/post.reducer";
import { errorToast } from "../utils/errorToast";

const postUrl = import.meta.env.VITE_SERVER_BASE_URL + "/posts"
export const createNewPost = async (caption, images) => {
    const toastId = toast.loading("Posting...")
    try {
        if (!caption && !images) return false;
        const formData = new FormData();
        formData.append("caption", caption);
        images.forEach((image) => {
            formData.append("images", image);
        })
        const response = await axios.post(`${postUrl}/create`, formData, {
            withCredentials: true
        })
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message);
            return response.data.success;
        }
        return false;
    } catch (error) {
        toast.dismiss(toastId);
        errorToast(error);
        return false;
    }
}
let page = 1;
export const getPosts = (limit = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${postUrl}?limit=${limit}&page=${page}`, {
            withCredentials: true
        })
        if (response.data.success) {
            dispatch(updatePost(response.data.data.post));
        }
        return [];

    } catch (error) {
        errorToast(error);
        return [];
    }
}

export const gatePostById = (postId) => async (dispatch) => {
    try {
        const response = await axios.get(`${postUrl}/${postId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            dispatch(singlePostUpdate(response.data.data));
            // return response.data.data.post;
        }
        return {};
    } catch (error) {
        errorToast(error);
        return {};
    }
}

export const deletePost = (postId) => async (dispatch) => {
    const toastId = toast.loading("Deleting...")
    try {
        const response = await axios.delete(`${postUrl}/delete/${postId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success("Post deleted successfully");
            dispatch(removeDeletedPost(postId));
        }
        return false;
    } catch (error) {
        toast.dismiss(toastId);
        errorToast(error);
        return false;
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const response = await axios.put(`${postUrl}/like/${postId}`, {}, {
            withCredentials: true
        })
        if (response.data.success) {
            dispatch(updatePostFeedback(response.data.data));
            dispatch(singlePostUpdate(response.data.data));
            return response.data.data;
        }
        return false;
    } catch (error) {
        errorToast(error);
        return false;
    }
}

export const gateComment = async (postId) => {
    try {
        const response = await axios.get(`${postUrl}/comment/${postId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            return response.data.data.comments
        }
        return []


    } catch (error) {
        errorToast(error);
        return []

    }

}

export const commentOnPost = (postId, comment) => async (dispatch) => {
    try {
        const response = await axios.post(`${postUrl}/comment/${postId}`, { comment }, {
            withCredentials: true
        })

        if (response.data.success) {
            dispatch(updatePostFeedback(response.data.data));
            dispatch(singlePostUpdate(response.data.data));
        }


    } catch (error) {
        errorToast(error);
    }
}

export const likeComment = async (commentId) => {
    try {
        const response = await axios.get(`${postUrl}/comment/like/${commentId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            return response.data.data;
        }
        return false;
    } catch (error) {
        errorToast(error);
        return false;
    }
}
export const gateReplay = async (commentId) => {

    try {
        const response = await axios.get(`${postUrl}/comment/reply/${commentId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            return response.data.data.replies;
        }
        return [];
    } catch (error) {
        errorToast(error);
        return [];
    }
}
export const replayOnComment = async (commentId, replay) => {

    try {
        const response = await axios.post(`${postUrl}/comment/reply/${commentId}`, { replay }, {
            withCredentials: true
        })
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        errorToast(error);
        return false;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${postUrl}/comment/delete/${commentId}`, {
            withCredentials: true
        })
        return response.data.success;
    } catch (error) {
        errorToast(error);
        return false;
    }
}



//gate user post
export const gateUserPost = async (userId) => {
    try {
        const response = await axios.get(`${postUrl}/user/${userId}`, {
            withCredentials: true
        })
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        errorToast(error);
        return [];
    }
}