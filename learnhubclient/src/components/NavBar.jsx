"use client";

import { Button, DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react"
import { useState } from 'react'

const NavBar = () => {
    const [user, setUser] = useState(false);
    // setUser(false);
    if (user) {
        return (
            <Navbar fluid className="bg-[#ffad33] shadow-2xl">
                <Navbar.Brand href="#">
                    <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">LearnHub</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <DarkThemeToggle className="mr-5" />
                    <Button>Get started</Button>
                    <Navbar.Toggle />
                </div>

                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    return (

            <Navbar fluid rounded className="bg-[#ffad33] shadow-2xl">
                <Navbar.Brand href="#">
                    <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">LearnHub</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <DarkThemeToggle className="mr-2" />
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar className="m-1" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@learnhub.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
    )

}

export default NavBar
