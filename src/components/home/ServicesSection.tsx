import SectionHeading from "@/components/ui/SectionHeading";
import ServicesList from "@/components/services/ServicesList";
import { getServices, type HomeContent } from "@/lib/content";

const ServicesSection = async ({ content }: { content: HomeContent["services"] }) => {
    const services = await getServices();

    return (
        <section id="services" className="mx-auto max-w-site px-6 pb-[140px] pt-[60px]">
            <div className="mb-14">
                <SectionHeading heading={content.heading} description={content.description} />
            </div>
            <ServicesList services={services} />
        </section>
    );
};

export default ServicesSection;
