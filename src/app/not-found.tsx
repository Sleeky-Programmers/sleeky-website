import ButtonLink from "@/components/ui/ButtonLink";
import FooterBar from "@/components/layout/FooterBar";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Page not found | Sleeky Programmers",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="relative overflow-x-clip">
      <SiteHeader />
      <main id="main" className="relative">
        <div aria-hidden="true" className="glow pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-green opacity-[0.14]" />
        <div className="relative mx-auto max-w-site px-6 pb-32 pt-20">
          <p className="m-0 text-sm uppercase tracking-[0.14em] text-muted">404</p>
          <h1 className="m-0 mt-6 font-display text-[clamp(56px,9vw,132px)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            This page<br /><span className="text-green">doesn&rsquo;t exist.</span>
          </h1>
          <p className="m-0 mt-8 max-w-[520px] text-xl leading-relaxed text-soft">
            The link may be old or mistyped. Let&rsquo;s get you somewhere useful.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" arrow>Back to home</ButtonLink>
            <ButtonLink href="/start-a-project" variant="outline">Start a project</ButtonLink>
          </div>
        </div>
      </main>
      <footer className="mx-auto max-w-site px-6 pb-12">
        <FooterBar />
      </footer>
    </div>
  );
}
