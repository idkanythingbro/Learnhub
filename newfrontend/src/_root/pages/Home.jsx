import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../service/user.service";
import { getCreatedCourses } from "../../service/courses.service";

const Home = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [createdCourses, setCreatedCourses] = useState(null);
  const loggedInUserData = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    if (loggedInUserData) {
      dispatch(getProfile(loggedInUserData._id));
    }
  }, [loggedInUserData]);

  const profileData = useSelector((state) => state.userReducer.profile);
  const createdCoursesData = useSelector(
    (state) => state.courseReducer.createdCourses
  );
  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);
  useEffect(() => {
    dispatch(getCreatedCourses());
  }, []);
  useEffect(() => {
    setCreatedCourses(createdCoursesData);
  }, [createdCoursesData]);
  return (
    <div className="common-container text-white">
      <div className="bg-dark-3 w-full h-2/3 flex-center flex-col gap-2 rounded-lg m-3 p-3">
        <img
          className="rounded-full w-[300px] h-[300px] object-cover border-4 border-off-white"
          src={profile?.avatar}
        />
        <div className="flex-center flex-col">
          <h2 className="h3-bold">{profile?.name}</h2>
          <p className="small-regular">{profile?.designation}</p>
        </div>
        <div className="flex flex-row justify-between w-[200px]">
          <div className="flex-center flex-col">
            <div>0</div>
            <div>Followers</div>
          </div>
          <div className="flex-center flex-col">
            <div>{createdCourses?.length}</div>
            <div>Courses</div>
          </div>
        </div>
      </div>
      <div className="bg-dark-3 w-full flex flex-col md:flex-row gap-2 p-3 min-h-80 rounded-lg">
        <div className="w-full h-full bg-dark-4 rounded">
          <h2 className="h3-bold text-center">Inbox</h2>
          <div className="flex-center">No new messages</div>
        </div>
        <div className="w-full rounded h-full bg-dark-4">
          <h2 className="h3-bold text-center">Connections</h2>
          <div className="flex-center">No new connections</div>
        </div>
        <div className="w-full bg-dark-4 rounded h-full">
          <h2 className="h3-bold text-center">Events</h2>
          <div className="flex-center">No current events</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
