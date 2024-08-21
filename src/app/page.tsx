import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Overview />
      <CoreValues />
    </>
  );
}

export default Home;