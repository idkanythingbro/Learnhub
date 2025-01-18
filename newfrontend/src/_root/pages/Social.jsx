import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialPostEditor from "../../components/socialSiteComponents/SocialPostEditor";
import { useClickOutside } from "../../utils/useClickOutside";
import { getPosts } from "../../service/post.service";
import PopupModel from "../../popup/PopupModel";
import Post from "../../components/socialSiteComponents/Post";
const Social = () => {
  const dispatch = useDispatch();
  const createPostRef = useRef(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const loggedInUserData = useSelector((state) => state.userReducer.user);
  const postsData = useSelector(state => state.postReducer.posts);
  useEffect(() => {
    setUser(loggedInUserData);
  }, [loggedInUserData]);

  useEffect(() => {
    console.log("Pst data",postsData);
    
    setPosts(postsData);
  }, [postsData])

  useEffect(() => {
    dispatch(getPosts());
  }, [])
  return (
    <div className="w-full flex flex-col  items-center p-2 pt-8 gap-4 ">
      <section ref={createPostRef} className=" flex gap-4 p-2  ">
        <div>
          <img
            src={user?.avatar}
            alt="Avatar"
            className="rounded-full h-10 w-10"
          />
        </div>
        <div>
          <div
            type="text"
            className=" border border-gray-200 bg-white p-2 rounded-3xl w-[15rem] md:w-[25rem] h-10 cursor-pointer text-gray-500 hover:bg-gray-100"
            onClick={() => setIsPostEditorOpen(true)}
          >
            What's on your mind?
          </div>
        </div>
      </section>
      {/* <span></span> */}
      {/* <p 
      className="border-b-2 border-gray-200 w-full text-center text-gray-500 mx-6"
      /> */}

      {isPostEditorOpen && <PopupModel callback={setIsPostEditorOpen}>
        <SocialPostEditor width="50vw" />
      </PopupModel>}

      <div className=" flex flex-col gap-4 mt-10 ">
        {
        posts &&  posts.map((post,index) => {
          return  <Post key={index} post={post} />
          })
        }
      </div>
    </div>
  );
};

export default Social;
