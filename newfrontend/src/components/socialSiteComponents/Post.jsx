import React, { useEffect, useRef, useState } from 'react'
import ReactLinkify from 'react-linkify'
import { useNavigate } from 'react-router-dom'
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useClickOutside } from '../../utils/useClickOutside'
import PostHeader from './PostHeader'
import ImageViewer from './ImageViewer'
import { useDispatch } from 'react-redux';
import { deletePost, gateComment } from '../../service/post.service';
import CommentSections from './CommentSections';
import Feedback from './Feedback';
const Post = ({ post }) => {
    
    const navigate = useNavigate()
    const menuDivRef = useRef(null);
    const dispatch = useDispatch()
    const { _id, owner, caption, images, likes, comments } = post;
    const [isCommentVisibale, setIsCommentVisibale] = useState(false);
    const [commentsDetails, setCommentDeatils] = useState([])
    const [isMenuDisplay, setIsMenuDisplay] = useState(false);
    //Close menu option dialog if click outside the dialog
    useClickOutside(menuDivRef, () => setIsMenuDisplay(false));

    const handelComment = async (visibility = !isCommentVisibale) => {
        setIsCommentVisibale(visibility)
        const res = await gateComment(_id);
        setCommentDeatils(res)
    }
    const handelPostDelete = () => {

        dispatch(deletePost(_id));
    }

    const handelSinglePostView = () => {
        // navigate(`/post/${_id}`)
    }
    useEffect(() => {
        handelComment(isCommentVisibale)
    }, [comments])

    // const loggedInUserData = useSelector(state => state.userReducer.user);
    return (
        <div className='w-11/12 flex flex-col items-center justify-center border rounded-xl p-4 gap-4 cursor-pointer relative' >
            <div ref={menuDivRef} className="  absolute top-4 right-1">
                <button onClick={() => setIsMenuDisplay(!isMenuDisplay)}><CiMenuKebab className="text-2xl" /></button>
                {
                    isMenuDisplay && <div className="z-[5] absolute right-1 border px-2 py-1 shadow-lg rounded-lg flex flex-col gap-2">
                        <button className="flex items-center gap-1" onClick={handelPostDelete}><MdDelete /> Delete</button>
                        {/* <button>Edit</button> */}
                    </div>
                }

            </div>
            <PostHeader
                className={"w-full"}
                name={owner.name}
                userName={owner.userName}
                profilePhoto={owner.avatar}
            />
            <div className='w-full text-white  ' onClick={handelSinglePostView}>
                <ReactLinkify>
                    <div name="caption" className='w-full pb-2'>
                        <p className='w-full '>
                            {caption}
                        </p>
                    </div>
                </ReactLinkify>

                {images && images.length > 0 && <ImageViewer
                    images={
                        images
                    }
                    className={" flex items-center justify-center"}
                    imgClass={""}
                />}
            </div>



            <Feedback _id={_id} handelComment={handelComment} likes={likes} comments={comments} />

            {isCommentVisibale && <CommentSections comments={commentsDetails} postId={_id} />}
        </div>
    )
}



export default Post