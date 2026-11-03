import FooterBar from "@/components/layout/FooterBar";
import PageHero from "@/components/ui/PageHero";
import { getPrivacy, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { seo } = await getPrivacy();
  return pageMetadata({ title: seo.title, description: seo.description, path: "/privacy-policy" });
}

// DRAFT: the privacy policy text is still "Open" in the brief (section 9); Sleeky
// must have it reviewed before launch. It's edited in the CMS (Pages > Privacy policy).
export default async function PrivacyPolicyPage() {
  const [privacy, settings] = await Promise.all([getPrivacy(), getSiteSettings()]);

  return (
    <>
      <main id="main">
        <PageHero
          crumbs={[{ name: "Privacy policy", path: "/privacy-policy" }]}
          title={<>Privacy <span className="text-green">policy</span></>}
          intro={privacy.intro}
        />
        <article className="mx-auto max-w-[820px] px-6 pb-32">
          {/* Cleaned by the CMS on save and rendered only through its editor schema. */}
          <div className="rich-text rich-text-sections" dangerouslySetInnerHTML={{ __html: privacy.html }} />
          <p className="m-0 mt-10 border-t border-line pt-10 text-[15px] text-muted">
            Questions about this policy? <a href={`mailto:${settings.email}`} className="text-green underline-offset-4 hover:underline">{settings.email}</a>
          </p>
        </article>
      </main>
      <footer className="mx-auto max-w-site px-6 pb-12">
        <FooterBar />
      </footer>
    </>
  );
}
