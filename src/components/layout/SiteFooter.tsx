import Link from "next/link";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { getHome, getSiteSettings } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import CookieSettingsButton from "./CookieSettingsButton";

const columnHeading = "m-0 mb-[18px] text-[13px] font-semibold uppercase tracking-[0.12em] text-muted";

// Homepage footer: "Let's talk." call to action and full contact columns (design canvas: Homepage).
const SiteFooter = async () => {
    const [settings, { closing }] = await Promise.all([getSiteSettings(), getHome()]);

    return (
        <footer className="relative overflow-hidden border-t border-line">
            <div aria-hidden="true" className="glow pointer-events-none absolute left-[10%] top-[10%] h-[560px] w-[560px] rounded-full bg-green opacity-[0.12]" />
            <div className="relative mx-auto max-w-site px-6 pb-16 pt-[140px]">
                <p className="rv m-0 text-sm uppercase tracking-[0.14em] text-muted">{closing.eyebrow}</p>
                <div className="rv">
                    <Link
                        href="/start-a-project"
                        className="big mt-5 block font-display text-[clamp(72px,14vw,220px)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white no-underline"
                    >
                        {closing.heading}
                    </Link>
                </div>
                <div className="rv mt-12 flex flex-wrap gap-3">
                    <ButtonLink href="/start-a-project">Start a project</ButtonLink>
                    <ButtonLink href={whatsappLink(settings)} variant="outline" trackLocation="footer_cta">WhatsApp us</ButtonLink>
                    <ButtonLink href={`mailto:${settings.email}`} variant="outline" trackLocation="footer_cta">{settings.email}</ButtonLink>
                </div>

                <div className="mt-[120px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 border-t border-line pt-14">
                    <div>
                        <Image src={site.logo.onDark} alt="Sleeky Programmers" width={101} height={36} unoptimized style={{ height: 36, width: "auto" }} />
                        <p className="m-0 mt-5 max-w-[260px] text-[15px] leading-relaxed text-muted">{settings.footerTagline}</p>
                    </div>
                    <div>
                        <h2 className={columnHeading}>Visit</h2>
                        <address className="m-0 text-base not-italic leading-relaxed text-white">
                            {settings.address.street}<br />{settings.address.locality}, {settings.address.region}
                        </address>
                    </div>
                    <div>
                        <h2 className={columnHeading}>Talk</h2>
                        <ul className="flex flex-col gap-2 text-base">
                            <li><a className="nl text-white" href={`tel:${settings.phone.e164}`} data-track-location="footer">Call {settings.phone.display}</a></li>
                            <li><a className="nl text-white" href={whatsappLink(settings)} target="_blank" rel="noopener noreferrer" data-track-location="footer">WhatsApp {settings.phone.display}</a></li>
                        </ul>
                    </div>
                    {settings.socials.length > 0 && (
                        <div>
                            <h2 className={columnHeading}>Follow</h2>
                            <ul className="flex flex-col gap-2 text-base">
                                {settings.socials.map((social) => (
                                    <li key={social.href}>
                                        <a className="nl text-white" href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mt-16 flex flex-wrap justify-between gap-3 text-[13px] text-faint">
                    <span>© {new Date().getFullYear()} {site.legalName}.</span>
                    <div className="flex flex-wrap gap-5">
                        <Link href="/privacy-policy" className="text-faint transition-colors hover:text-white">Privacy policy</Link>
                        <CookieSettingsButton />
                        <span>Lagos, Nigeria</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
