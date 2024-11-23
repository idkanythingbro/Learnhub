const DashBoard = () => {
  return (
    <div className="flex flex-col h-full w-full p-2 bg-slate-400">
      <div className="flex lg:flex-row flex-col h-1/3 p-2 bg-slate-500 gap-2">
        <div className="m-auto">
          <img
            className="bg-black rounded-full w-[150px] md:w-[200px] lg:w-[250px] h-[150px] md:h-[200px] lg:h-[250px] m-auto object-contain border-1 border-solid"
            src="/src/assets/luffy.jfif"
            alt="Profile"
          />
        </div>
        <div className="flex ">
          <span className="text-5xl font-bold">Monkey D Luffy</span>
        </div>
        <div className="m-auto">Streak</div>
        <div className="m-auto">Popularity</div>
      </div>
      <div className="m-auto">To be DOne</div>
    </div>
  );
};

export default DashBoard;
