"use client";

import { Footer, List, Label } from "flowbite-react";
import { Crousel } from './Crousel';
import NavBar from "./NavBar";


const HomePage = () => {
    return (
        <div className=''>
            <NavBar/>
            <Crousel />
            <div className="flex w-screen flex-col items-center gap-2 border-b-2 bg-green-200 p-5 md:p-20 dark:bg-slate-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    At LearnHub, we are dedicated to empowering college students with accessible, engaging, and effective learning tools. Our platform offers a wide range of resources designed to support students at every stage of their academic journey. With interactive lessons, study materials, and collaborative tools, we make learning a personalized experience that’s both comprehensive and enjoyable.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Why Choose LearnHub?
                </p>
                <List className="hidden flex-col md:flex">
                    <List.Item>Comprehensive Content: From core subjects to specialized courses, find materials that fit your curriculum and learning goals.</List.Item>
                    <List.Item>Interactive Learning: Engage with content through quizzes, videos, and real-time discussions, making study sessions more productive.</List.Item>
                    <List.Item>Peer Collaboration: Connect and collaborate with classmates, form study groups, and work together on assignments.</List.Item>
                    <List.Item>Expert Support: Access guidance from instructors and professionals to deepen your understanding and clarify any doubts.</List.Item>
                </List>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Whether you&apos;re aiming to ace your exams or build a strong foundation in your field, LearnHub is here to support your academic success.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    <a className="text-sm text-blue-700 dark:text-slate-400 dark:underline" href="#">Join Today!</a> Start your learning journey with us and unlock your full potential.
                </p>
                <form className="mx-auto flex w-full flex-col items-center md:w-1/2 md:flex-row">
                    <div className="relative w-full">
                        <input type="text" id="voice-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search for tutorials, tutors... eg: Artificial Intelligence" required />
                    </div>
                    <button type="submit" className="m-2 inline-flex items-center rounded-lg border border-blue-700 bg-blue-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-2 size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>Search
                    </button>
                </form>
                <Label className=""><a className="flex text-lg text-blue-700 dark:text-slate-400 dark:underline" href="#">Not Sure where to begin ?</a></Label>
            </div>
            <Footer container>
                <div className="w-full text-center">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                        <Footer.Brand
                            href="#"
                            src="./../../public/logo.svg"
                            alt="LearnHub Logo"
                            name="LearnHub"
                        />
                        <Footer.LinkGroup>
                            <Footer.Link href="#">About</Footer.Link>
                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                            <Footer.Link href="#">Licensing</Footer.Link>
                            <Footer.Link href="#">Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <Footer.Divider />
                    <Footer.Copyright href="#" by="LearnHub" year={2024} />
                </div>
            </Footer>
        </div>
    )
}

export default HomePage
