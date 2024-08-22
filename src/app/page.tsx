import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import Services from "@/components/Services";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Overview />
      <CoreValues />
      <Services />
    </>
  );
}

export default Home;