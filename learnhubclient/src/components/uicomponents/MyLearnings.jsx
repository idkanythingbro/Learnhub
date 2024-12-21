import { Tabs } from "flowbite-react";
import CourseCard from "./CourseCard";
const MyLearnings = () => {
  return (
    <Tabs
      className="flex justify-center items-center   dark:bg-gray-800"
      aria-label="Tabs with icons"
      variant="underline"
    >
      <Tabs.Item active title="All Courses">
        <CourseCard
          courseimage="https://th.bing.com/th?id=OIP.pITjdsGR7h3HQ53M-YETXAHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          coursename="Cloud Computing"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order."
        />
      </Tabs.Item>
      <Tabs.Item title="My Lists">
        <span className="font-medium text-gray-800 dark:text-white">
          No content here yet!!
        </span>
        .
      </Tabs.Item>
      <Tabs.Item title="Wishlist">
        <span className="font-medium text-gray-800 dark:text-white">
          No content here yet!!
        </span>
      </Tabs.Item>
      <Tabs.Item title="Archived">
        <span className="font-medium text-gray-800 dark:text-white">
          No content here yet!!
        </span>
      </Tabs.Item>
      <Tabs.Item title="Learning Tools">
        {" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Comming Soon!!
        </span>
      </Tabs.Item>
    </Tabs>
  );
};

export default MyLearnings;
