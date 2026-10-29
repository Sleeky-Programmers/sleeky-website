import StartProjectForm from "@/components/forms/StartProjectForm";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a Project | Sleeky Programmers",
  description:
    "Tell us what you want to build: a website, app or automation. Four quick steps, and a Sleeky specialist replies within 24 hours.",
  path: "/start-a-project",
});

export default function StartAProjectPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Start a project", path: "/start-a-project" }])} />
      <StartProjectForm />
    </>
  );
}
