import SectionHeading from "@/components/ui/SectionHeading";
import { CaseCard, FeaturedCaseCard } from "@/components/work/WorkCards";
import { getCaseStudies, type HomeContent } from "@/lib/content";

const FeaturedWork = async ({ content }: { content: HomeContent["work"] }) => {
    const [featured, ...others] = await getCaseStudies();
    if (!featured) return null;

    return (
        <section id="work" className="mx-auto max-w-site px-6 pb-[120px] pt-10">
            <SectionHeading heading={content.heading} description={content.description} />
            <div className="mt-[72px]"><FeaturedCaseCard study={featured} /></div>
            {others.length > 0 && (
                <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
                    {others.map((study) => <CaseCard key={study.slug} study={study} />)}
                </div>
            )}
        </section>
    );
};

export default FeaturedWork;
