import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const CourseCard = () => {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc=""
    >
      <Link to={"/my-learnings/player"}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Cloud Computing
        </h5>
      </Link>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  );
};

export default CourseCard;
