import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import CoreValues from "@/components/CoreValues";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import Services from "@/components/Services";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Overview />
      <CoreValues />
      <Services />
      <Clients />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;