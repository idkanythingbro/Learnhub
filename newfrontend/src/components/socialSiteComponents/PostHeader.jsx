import React from 'react'
import { Link } from 'react-router-dom'
import { learnHubBasUrl } from '../../assets/constant';

const PostHeader = ({ name, userName, profilePhoto, bio = "", className }) => {
    let desc = bio;
    const maxLength = 70;
    if (desc.length > maxLength) {
        desc = desc.substring(0, maxLength);
    }
    return (
        <div className={`${className} flex flex-col gap-1 items-start `}>
            <div className='flex gap-2'>
                <img
                    src={profilePhoto}
                    alt="Avatar"
                    className="rounded-full h-10 w-10"
                />

                <p className='flex flex-col'>
                    <span className="text-lg font-bold text-white">{name}</span>
                    {/* //FIXME - Change the link to the user profile page */}
                    <Link to={`/`} className="text-sm text-slate-200 ">{userName}</Link>

                    <span className="text-sm">{desc}{bio.length > maxLength && <span className=' text-gray-500 text-2xl'>...</span>}</span>
                </p>
            </div>

        </div>
    )
}

export default PostHeader