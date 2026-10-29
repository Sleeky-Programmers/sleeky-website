import SectionHeading from "@/components/ui/SectionHeading";
import ServicesList from "@/components/services/ServicesList";
import { getServices } from "@/lib/content";

const ServicesSection = async () => {
    const services = await getServices();

    return (
        <section id="services" className="mx-auto max-w-site px-6 pb-[140px] pt-[60px]">
            <div className="mb-14">
                <SectionHeading
                    lead="What we"
                    accent="build"
                    description="Hover a service. Each one opens its own page — built to rank on Google for what clients search."
                />
            </div>
            <ServicesList services={services} />
        </section>
    );
}

export default ServicesSection;
