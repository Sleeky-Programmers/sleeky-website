import BriefConfirmation from "@/components/forms/BriefConfirmation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank You | Sleeky Programmers",
  description: "Your project brief has been sent. A Sleeky specialist will reply within 24 hours.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return <BriefConfirmation />;
}
