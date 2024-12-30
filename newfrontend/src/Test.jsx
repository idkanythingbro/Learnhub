import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
       console.log(file);
       
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    // <div {...getRootProps()}>
    //   <input {...getInputProps()} />
    //   <p>Drag 'n' drop some files here, or click to select files</p>
    // </div>
    <div>
        <input type="file" name="" id="" />
    </div>
  )
}

export default MyDropzone