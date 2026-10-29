import AutomationShowcase from "@/components/home/AutomationShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Process from "@/components/home/Process";
import ServicesSection from "@/components/home/ServicesSection";
import Statement from "@/components/home/Statement";
import SiteFooter from "@/components/layout/SiteFooter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sleeky Programmers | Websites, Apps & Automation in Lagos",
  absoluteTitle: true,
  description:
    "Sleeky Programmers builds premium websites, web and mobile apps, and business automation for ambitious businesses in Lagos, Nigeria and beyond.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <FeaturedWork />
        <ServicesSection />
        <AutomationShowcase />
        <Process />
      </main>
      <SiteFooter />
    </>
  );
}
