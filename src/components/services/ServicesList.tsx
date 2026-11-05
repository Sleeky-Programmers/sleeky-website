import Link from "next/link";
import type { Service } from "@/lib/content/types";
import { ArrowRight } from "@/components/ui/icons";

// Hover a row: it fills green from the bottom and the arrow turns (brief 5.4).
const ServicesList = ({ services, headingLevel = "h3" }: { services: Service[]; headingLevel?: "h2" | "h3" }) => {
    const Heading = headingLevel;

    return (
        <ul className="border-b border-line">
            {services.map((service) => (
                <li key={service.slug} className="rv">
                    <Link
                        href={`/services/${service.slug}`}
                        className="svc flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line px-6 py-[34px]"
                    >
                        <span className="sn w-10 font-display text-base font-semibold">{service.number}</span>
                        <Heading className="m-0 flex-[1_1_380px] font-display text-[clamp(30px,4vw,56px)] font-bold tracking-[-0.035em]">
                            {service.name}
                        </Heading>
                        <span className="sd max-w-[420px] flex-[1_1_300px] text-base leading-[1.55]">{service.summary}</span>
                        <ArrowRight size={34} strokeWidth={2} className="sa" />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default ServicesList;
