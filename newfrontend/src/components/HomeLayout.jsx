import About from "./About";
import Features from "./Features";
import Hero from "./Hero";
import NavBar from "./shared/Navbar";

const HomeLayout = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-white">
      <NavBar />
      <Hero />
      <About />
      <Features />
    </div>
  );
};

export default HomeLayout;
