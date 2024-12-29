/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

const FileUploader = ({ fieldChange }) => {
  const [file, setFile] = useState([]);
  const [dataURL, setDataURL] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setDataURL(URL.createObjectURL(acceptedFiles[0]));
      // console.log(acceptedFiles);
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: {
    //   "image/*": [".png", ".jpeg", ".jpg"],
    // },
  });
  // console.log(file[0].type);

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {dataURL ? (
          <div className="file_uploader-box ">
            <div className="object-contain">
              {file[0].type === "video/mp4" ? (
                <video src={dataURL} className="p-7 h-80 lg:h-[412px] " />
              ) : (
                <img
                  src={dataURL}
                  alt="file upload"
                  className="p-7 h-80 lg:h-[412px]"
                />
              )}
            </div>
            <p className="text-light-4 small-regular mb-6">
              Click or Drag again to upload again
            </p>
          </div>
        ) : (
          <div className="file_uploader-box ">
            <img
              src="/icons/upload.svg"
              width={96}
              height={77}
              alt="file upload"
            />

            <h3 className="base-medium text-light-2 mb-2 mt-6 uppercase">
              Drag files here or Click here to upload
            </h3>
            <p className="text-light-4 small-regular mb-6">
              SVG, PNG, JPG, JPEG
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
