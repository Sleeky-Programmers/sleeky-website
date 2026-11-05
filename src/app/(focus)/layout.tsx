import Logo from "@/components/ui/Logo";
import FooterBar from "@/components/layout/FooterBar";
import { ChatBubble } from "@/components/ui/icons";
import { getSiteSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

// Distraction-free layout for Start a project and Thank you, as on the design canvas.
export default async function FocusLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div aria-hidden="true" className="glow pointer-events-none absolute right-[-10%] top-[-10%] h-[640px] w-[640px] rounded-full bg-green opacity-[0.14]" />
      <header className="relative z-10">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-7">
          <Logo height={36} label="Sleeky Programmers — back to home" />
          <a
            href={whatsappLink(settings, "Hi Sleeky, I'd rather chat about my project on WhatsApp.")}
            target="_blank"
            rel="noopener noreferrer"
            data-track-location="brief_header"
            className="inline-flex items-center gap-2 rounded-full border border-slate px-[18px] py-[11px] text-sm font-medium text-white no-underline transition-colors hover:border-green"
          >
            <ChatBubble size={16} color="#25D366" />
            Rather chat? WhatsApp us
          </a>
        </div>
      </header>
      <main id="main" className="relative z-[1]">{children}</main>
      <footer className="relative z-[1] mx-auto max-w-[1180px] px-6 pb-12">
        <FooterBar />
      </footer>
    </div>
  );
}
