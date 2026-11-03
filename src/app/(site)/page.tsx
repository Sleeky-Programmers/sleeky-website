import AutomationShowcase from "@/components/home/AutomationShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Process from "@/components/home/Process";
import ServicesSection from "@/components/home/ServicesSection";
import Statement from "@/components/home/Statement";
import SiteFooter from "@/components/layout/SiteFooter";
import { getHome } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { seo } = await getHome();
  return pageMetadata({ title: seo.title, absoluteTitle: true, description: seo.description, path: "/" });
}

export default async function Home() {
  const home = await getHome();

  return (
    <>
      <main id="main">
        <Hero content={home.hero} />
        <Marquee items={home.marquee} />
        <Statement content={home.statement} />
        <FeaturedWork content={home.work} />
        <ServicesSection content={home.services} />
        <AutomationShowcase content={home.automation} />
        <Process content={home.process} />
      </main>
      <SiteFooter />
    </>
  );
}
