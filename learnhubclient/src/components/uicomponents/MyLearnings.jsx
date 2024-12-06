import { Navbar, TextInput } from "flowbite-react";
const MyLearnings = () => {
  return (
    <div>
      <Navbar fluid className="flex">
        <div className="flex flex-row justify-center items-center">
          <TextInput id="search-course" fluid="true" className="flex mr-4" />
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#">All Courses</Navbar.Link>
            <Navbar.Link href="#">My Lists</Navbar.Link>
            <Navbar.Link href="#">Wishlist</Navbar.Link>
            <Navbar.Link href="#">Archived</Navbar.Link>
            <Navbar.Link href="#">Learning Tools</Navbar.Link>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MyLearnings;
