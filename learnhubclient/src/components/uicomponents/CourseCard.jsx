import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const CourseCard = ({ courseimage, coursename, description }) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={courseimage}
    >
      <Link to={"/my-learnings/player"}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {coursename}
        </h5>
      </Link>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  );
};

export default CourseCard;
