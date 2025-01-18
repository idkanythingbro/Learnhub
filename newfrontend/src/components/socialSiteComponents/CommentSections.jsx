import React, { useEffect, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { useDispatch } from 'react-redux';
import { commentOnPost, deleteComment, replayOnComment } from '../../service/post.service';
import Comment from './Comment';

const CommentSections = ({ comments, postId = null, commentId = null }) => {
    const dispatch = useDispatch();
    const [allComments, setAllComments] = useState(comments)
    const [text, setText] = useState('')
    function handleOnEnter(_) {
        // alert(text);
        if (commentId) {
            handelCommentReplay();
        }
        else if (postId) {
            handelComment();
        }
    }

    async function handelComment() {
        dispatch(commentOnPost(postId, text))
    }
    async function handelCommentReplay() {
        const res = await replayOnComment(commentId, text)
        if (res) {
            setAllComments([...allComments, res.newReplay])
        }
    }
    const handelCommentDelete = async (commentId) => {
        //TODO - Add delete functionality
        const res = await deleteComment(commentId);
        if (res) {
            setAllComments(allComments.filter(comment => comment._id !== commentId))
        }
    }
    useEffect(() => {
        setAllComments(comments)
    }, [comments])

    return (
        <div className='w-full'>
            <div className='text-gray-900 relative '>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                    shouldReturn={true}

                />
                {/* <button onClick={()=>handleOnEnter()} className=' absolute right-0 text-teal-700'> <BsFillSendFill /></button> */}
            </div>
            <div>
                {
                    allComments && allComments.length > 0 && allComments.map(({ _id, comment, owner, replies, likes }, index) => (
                        <Comment key={_id} _id={_id} comment={comment} owner={owner} replies={replies} likes={likes} index={index} handelDelete={handelCommentDelete} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default CommentSections