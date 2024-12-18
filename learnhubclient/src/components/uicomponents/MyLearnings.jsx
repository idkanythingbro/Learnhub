import { Tabs, TextInput } from "flowbite-react";
import CourseCard from "./CourseCard";
const MyLearnings = () => {
  return (
    <Tabs
      className="flex justify-center items-center  dark:bg-gray-800"
      aria-label="Tabs with icons"
      variant="underline"
    >
      <Tabs.Item active title="All Courses">
        <CourseCard />
      </Tabs.Item>
      <Tabs.Item title="My Lists">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Dashboard tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Wishlist">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Settings tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Archived">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Contacts tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Learning Tools">Disabled content</Tabs.Item>
    </Tabs>
  );
};

export default MyLearnings;
