import FooterBar from "@/components/layout/FooterBar";
import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy | Sleeky Programmers",
  description:
    "How Sleeky Programmers collects, uses and protects personal data submitted through this website, in line with the Nigeria Data Protection Act 2023.",
  path: "/privacy-policy",
});

// DRAFT: the privacy policy text is still "Open" in the brief (section 9). This draft
// describes what the site actually collects; Sleeky must have it reviewed before launch.
const sections = [
  {
    title: "Who we are",
    body: [
      `${site.legalName} ("we", "us") is a software company at ${site.address.street}, ${site.address.locality}, ${site.address.region}, Nigeria. We are responsible for the personal data collected through this website.`,
    ],
  },
  {
    title: "What we collect",
    body: [
      "Project briefs: when you start a project, we collect your name, company, email address, WhatsApp number, preferred contact channel, project details, timeline and any document you choose to attach.",
      "Analytics: if you accept analytics cookies, we use Google Analytics and HubSpot to understand how visitors find and use the site, including pages viewed and how you arrived.",
      "Messages: if you contact us by WhatsApp, phone or email, we receive the details you share in that conversation.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use the details in your brief only to respond to your request, prepare a proposal and follow up through the channel you chose.",
      "We use analytics data in aggregate to improve the website and understand which pages and channels bring enquiries.",
      "We do not sell your personal data.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Analytics cookies stay off until you accept them in the cookie banner. You can change your choice at any time using \"Cookie settings\" at the bottom of every page.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "We use trusted service providers to run this website and handle enquiries, including our hosting provider, email provider, Google (Analytics and reCAPTCHA) and HubSpot (customer relationship management). They process data on our behalf and only as needed to provide their services.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep enquiry details for as long as needed to respond and, if we work together, for the duration of our relationship and any period required by law.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under the Nigeria Data Protection Act 2023, you can ask to access, correct or delete your personal data, object to or restrict how we use it, and withdraw consent at any time.",
      `To make a request, email ${site.email}. You can also lodge a complaint with the Nigeria Data Protection Commission.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <main id="main">
      <PageHero
        crumbs={[{ name: "Privacy policy", path: "/privacy-policy" }]}
        title={<>Privacy <span className="text-green">policy</span></>}
        intro="How we collect, use and protect the information you share with us through this website."
      />
      <article className="mx-auto max-w-[820px] px-6 pb-32">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-line py-10">
            <h2 className="m-0 font-display text-[28px] font-bold tracking-[-0.02em]">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0 mt-4 text-[17px] leading-relaxed text-soft">{paragraph}</p>
            ))}
          </section>
        ))}
        <p className="m-0 border-t border-line pt-10 text-[15px] text-muted">
          Questions about this policy? <a href={`mailto:${site.email}`} className="text-green underline-offset-4 hover:underline">{site.email}</a>
        </p>
      </article>
      </main>
      <footer className="mx-auto max-w-site px-6 pb-12">
        <FooterBar />
      </footer>
    </>
  );
}
