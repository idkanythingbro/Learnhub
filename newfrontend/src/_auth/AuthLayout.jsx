import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <div className="flex">
      {isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          {/* <video
            src="/videos/authpageimage.mp4"
            className="absolute top-0 left-0 h-screen w-screen -z-10 object-cover bg-no-repeat"
            loop
            autoPlay
            muted
          ></video> */}
        </>
      )}
    </div>
  );
};

export default AuthLayout;
