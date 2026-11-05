import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import { fullAddress, site } from "@/lib/site";
import CookieSettingsButton from "./CookieSettingsButton";

// Compact footer bar used on inner pages (design canvas: Service, Case study, About).
const FooterBar = async ({ withBorder = true }: { withBorder?: boolean }) => {
    const settings = await getSiteSettings();

    return (
        <div className={`flex flex-wrap items-center justify-between gap-6 text-sm text-muted ${withBorder ? "border-t border-line pt-9" : ""}`}>
            <Link href="/" aria-label="Sleeky Programmers home" className="block leading-none">
                <Image src={site.logo.onDark} alt="Sleeky Programmers" width={90} height={32} unoptimized style={{ height: 32, width: "auto" }} />
            </Link>
            <span>
                {fullAddress(settings)} ·{" "}
                <a href={`tel:${settings.phone.e164}`} data-track-location="footer" className="text-white no-underline">{settings.phone.display}</a> ·{" "}
                <a href={`mailto:${settings.email}`} data-track-location="footer" className="text-white no-underline">{settings.email}</a>
            </span>
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span>© {new Date().getFullYear()} {site.legalName}.</span>
                <Link href="/privacy-policy" className="text-muted transition-colors hover:text-white">Privacy policy</Link>
                <CookieSettingsButton />
            </span>
        </div>
    );
};

export default FooterBar;
