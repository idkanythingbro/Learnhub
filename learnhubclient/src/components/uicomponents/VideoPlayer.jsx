import ReactPlayer from "react-player";
const VideoPlayer = () => {
  return (
    <div className="flex w-full dark:bg-slate-800">
      <ReactPlayer
        url="https://youtu.be/4nzl8vDI43s"
        controls={true}
        width={"1280px"}
        height={"720px"}
      ></ReactPlayer>
    </div>
  );
};

export default VideoPlayer;
