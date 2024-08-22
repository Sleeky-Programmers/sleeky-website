import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
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
      <CallToAction />
    </>
  );
}

export default Home;