import React, { useEffect, useRef, useState } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { gateReplay, likeComment } from "../../service/post.service";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../utils/useClickOutside";
import CommentSections from "./CommentSections";
const Comment = ({ _id, comment, owner, replies, likes, handelDelete }) => {

  const menuDivRef = useRef(null);
  const loggedInUserData = useSelector(state => state.userReducer.user);
  const [isLike, seIsLike] = useState(likes.includes(loggedInUserData._id));
  const [numberOfLike, setNumberOfLike] = useState(likes?.length || 0)
  const [isReplay, setIsReplay] = useState(false);
  const [replay, setReplay] = useState([]);
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);
  //Close menu option dialog if click outside the dialog
  useClickOutside(menuDivRef, () => setIsMenuDisplay(false));

  const handelLik = async () => {
    const res = await likeComment(_id)
    if (res) {
      likes = res?.comment?.likes
      setNumberOfLike(likes.length)

    }
    seIsLike(likes.includes(loggedInUserData._id))
  }

  const handelReplay = async (visibility = !isReplay) => {
    const res = await gateReplay(_id);
    setIsReplay(visibility)
    setReplay(res)
  }

  useEffect(() => {
    handelReplay(isReplay)
  }, [comment])

  return (

    <div className="w-full border rounded-lg p-2 my-2 relative text-white">
      <div ref={menuDivRef} className=" absolute top-1 right-1">
        <button onClick={() => setIsMenuDisplay(!isMenuDisplay)}><CiMenuKebab className=" rotate-90 text-lg" /></button>
        {
          isMenuDisplay && <div className="absolute top-5 right-1 border px-2 py-1 shadow-lg rounded-lg flex flex-col gap-2">
            <button className="flex items-center gap-1" onClick={() => handelDelete(_id)}><MdDelete /> Delete</button>
            {/* <button>Edit</button> */}
          </div>
        }

      </div>
      <div className='flex items-start space-x-2 w-full  '>
        {/* <ProfilePhoto name={owner.userName} avatar={owner.avatar} /> */}
        <img
          src={owner.avatar}
          alt="Avatar"
          className="rounded-full h-10 w-10"
        />
        <div className=' rounded-lg  w-9/12 flex flex-col gap-2'>
          <div>
            <p className='text-sm font-semibold'>{owner.userName}</p>
            <p className='text-sm'>{comment}</p>
          </div>
          <div className=" flex gap-3">
            <button className={`text-xs  ${isLike ? "text-blue-500" : "text-gray-400"} flex gap-1`} onClick={handelLik}><span>{numberOfLike}</span>Like</button>
            <button onClick={() => handelReplay()} className='text-xs text-gray-400 flex gap-1' ><span>{replies}</span>reply</button>
          </div>
        </div>
      </div>
      {isReplay && replay && <CommentSections comments={replay} commentId={_id} />}
    </div>

  )
}

export default Comment


