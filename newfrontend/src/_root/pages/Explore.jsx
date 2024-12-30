import { useEffect } from "react";
import { getAllCourses } from "../../service/courses.service";

const Explore = () => {
  useEffect(()=>{
    getAllCourses()
  },[])
  return <div>Explore</div>;
};

export default Explore;
