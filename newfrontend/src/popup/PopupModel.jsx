import React from 'react'
import ReactDOM from 'react-dom'
const PopupModel = ({children,callback}) => {
  return ReactDOM.createPortal(
    <>
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 z-[500]'></div>
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[600] p-4 rounded-lg'>
            <button onClick={()=>callback(false)} className='absolute top-[-15px] right-[-5px] p-2 text-3xl text-gray-400 hover:text-black'>&times;</button>
            {children}
        </div>
    </>,
    document.getElementById('popup-root')
  )
}

export default PopupModel