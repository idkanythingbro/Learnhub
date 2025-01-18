import React, { useRef, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
// import { CopyToClipboard, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsAppShareButton } from '../Share';
import { useDispatch, useSelector } from 'react-redux';
import { learnHubBasUrl } from '../../assets/constant';
import { likePost } from '../../service/post.service';
import { useClickOutside } from '../../utils/useClickOutside';

const Feedback = ({ _id, likes = [], comments, handelComment = null }) => {

    const loggedInUserData = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const shareRef = useRef(null);
    const [isLike, setIsLike] = useState(likes.includes(loggedInUserData._id));
    const [isShare, setIsShare] = useState(false);
    const handleLike = async () => {
        dispatch(likePost(_id))
        setIsLike(!isLike);
    }
    const postShareLink = `${learnHubBasUrl}/post/${_id}`

    // Close share option dialog if click outside the dialog
    useClickOutside(shareRef, () => setIsShare(false));

    return (
        <div className='w-full border-t flex justify-around items-center py-3 relative text-white'>
            <button className={`flex items-center gap-2 `} onClick={handleLike}>
                <span className={`${isLike && "text-blue-400"}`}>{likes?.length}</span>
                {isLike ? <AiFillLike color='#00a8ff' fontSize={"1.2rem"} /> : <AiOutlineLike fontSize={"1.2rem"} />}
            </button>
            <button className='flex items-center gap-2' onClick={() => handelComment && handelComment()}>
                <span>{comments} Comments</span>
                {/* <TfiCommentAlt fontSize={"1.2rem"} /> */}
            </button>
            <button className='flex items-center gap-2' onClick={() => setIsShare(true)}>
                <span>Share</span>
                <PiShareFat fontSize={"1.2rem"} />
            </button>
            {/* {
                isShare && <div ref={shareRef} className=' absolute bottom-full right-0 flex gap-6 bg-white p-4 rounded-2xl text-black'>
                    <CopyToClipboard text={postShareLink} />
                    <WhatsAppShareButton link={postShareLink} message='' />
                    <FacebookShareButton link={postShareLink} />
                    <LinkedinShareButton link={postShareLink} />
                    <TwitterShareButton link={postShareLink} message='' />
                </div>
            } */}

        </div>
    )
}

export default Feedback