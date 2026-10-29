import SectionHeading from "@/components/ui/SectionHeading";
import { CaseCard, FeaturedCaseCard } from "@/components/work/WorkCards";
import { getCaseStudies } from "@/lib/content";

const FeaturedWork = async () => {
    const [featured, ...others] = await getCaseStudies();

    return (
        <section id="work" className="mx-auto max-w-site px-6 pb-[120px] pt-10">
            <SectionHeading
                lead="Featured"
                accent="work"
                description="Products we've shipped for teams across Nigeria — from voting platforms to fintech dashboards."
            />
            {featured && <div className="mt-[72px]"><FeaturedCaseCard study={featured} /></div>}
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
                {others.map((study) => <CaseCard key={study.slug} study={study} />)}
            </div>
        </section>
    );
}

export default FeaturedWork;
