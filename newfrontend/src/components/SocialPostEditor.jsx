import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useClickOutside } from '../utils/useClickOutside';
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from 'react-toastify';
import { createNewPost } from '../service/post.service';
const SocialPostEditor = ({
    width = "25rem",
    minWidth = "15rem",
    minHeight = "15rem",
    backgroundColor = "white",
    textColor = "black",
    submitButtonText = "Submit",
    calBack = (text, files) => {
    }
}) => {
    const fileInputRef = useRef(null);
    const emojiDiv = useRef(null)
    const [files, setFiles] = useState([]);
    const [text, setText] = useState("");
    const [isEmojiPick, setIsEmojiPick] = useState(false);
    //Close Emoji Dialog if Click Outside the dialog
    useClickOutside(emojiDiv, setIsEmojiPick)
    const handelSubmit = () => {
        // calBack(text, files);
        // alert("This is a test alert")
        // console.log(text, files);
        createNewPost(text, files).then((res) => {
            if (res) {
                setText("");
                setFiles([]);
            }
        })
        
    }
    const handleUpload = () => {
        fileInputRef && fileInputRef.current.click();
    }
    const handleAddFile = async (event) => {
        const selectedFiles = Array.from(event.target.files);

        selectedFiles.forEach(file => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;
                if (aspectRatio < 1.4 || aspectRatio > 2.2) {
                    toast.warn("This image not properly display")
                }
            };
        })

        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

    }
    const handleRemoveFile = (fileToRemove) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };
    const onEmojiClick = (emojiObject) => {
        setText(text + emojiObject.emoji);
    };

    // useEffect(() => {
    //     alert("This is a test alert")
    // }, [])
    return (
        <div
            className={`border rounded-xl  p-6 min-w-[30rem] relative`}
            style={{ backgroundColor: backgroundColor, color: textColor, width: width }}
        >
            <textarea
                className={`p-1 outline-none resize-none`}
                style={{ minHeight: minHeight, minWidth: minWidth, width: "100%" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            {
                files && files.length > 0 && (
                    <div className='flex flex-wrap'>
                        {
                            files.map((file, index) => (
                                <SelectedPhotoPreview file={file} handleRemoveFile={handleRemoveFile} key={index} />
                            ))
                        }
                    </div>
                )
            }
            <div className='  flex items-center justify-between'>
                <div className='  flex items-center gap-5'>
                    <button className='text-2xl' onClick={() => setIsEmojiPick(!isEmojiPick)}>🙂</button>

                    <div >
                        <button className='text-3xl' onClick={handleUpload} ><MdAddPhotoAlternate /></button>
                        <input type="file"
                            onChange={handleAddFile}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            multiple
                        />
                    </div>
                </div>
                <button className=' bg-blue-500 text-white p-2 rounded-2xl' onClick={handelSubmit}>{submitButtonText}</button>
            </div>

            {
                isEmojiPick && <div className=' absolute z-[5] top-[40%] left-[50%]' ref={emojiDiv}>
                    <EmojiPicker onEmojiClick={onEmojiClick} disableAutoFocus={true} native />
                </div>
            }
        </div>
    )
}

export default SocialPostEditor

export const SelectedPhotoPreview = ({ file, handleRemoveFile }) => {
    if (!file) {
        return (
            <></>
        )
    }
    return (
        <div className='relative m-2'>
            <img
                src={URL.createObjectURL(file)}
                alt='Not Preview'
                className='w-40'
            />
            {
                handleRemoveFile && <button
                    onClick={() => handleRemoveFile(file)}
                    className='absolute top-0 right-0 bg-red-600 text-gray-500 px-[8px] py-[2px] rounded-full'
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.78 12.72C14.07 13.01 14.07 13.49 13.78 13.78C13.63 13.93 13.44 14 13.25 14C13.06 14 12.87 13.93 12.72 13.78L8 9.06L3.28 13.78C3.13 13.93 2.94 14 2.75 14C2.56 14 2.37 13.93 2.22 13.78C1.93 13.49 1.93 13.01 2.22 12.72L6.94 8L2.22 3.28C1.93 2.99 1.93 2.51 2.22 2.22C2.51 1.93 2.99 1.93 3.28 2.22L8 6.94L12.72 2.22C13.01 1.93 13.49 1.93 13.78 2.22C14.07 2.51 14.07 2.99 13.78 3.28L9.06 8L13.78 12.72Z" fill="currentColor"></path>
                    </svg>
                </button>
            }
        </div>

    )
}