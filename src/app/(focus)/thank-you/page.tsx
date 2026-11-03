import BriefConfirmation from "@/components/forms/BriefConfirmation";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Thank You | Sleeky Programmers",
  description: "Your project brief has been sent. A Sleeky specialist will reply within 24 hours.",
  path: "/thank-you",
  noIndex: true,
});

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  return <BriefConfirmation whatsappHref={whatsappLink(settings, "Hi Sleeky, I just sent a project brief on your website.")} />;
}
