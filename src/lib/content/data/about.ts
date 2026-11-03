import type { AboutContent } from "../types";

// About page copy from the design canvas. Used until the CMS is connected (CMS_API_URL);
// after that it's edited in the CMS under Pages > About.
// The team section appears once every member has a role (brief section 9: team
// photography and details are still "Open"). Until photos are supplied, branded tiles are shown.

export const about: AboutContent = {
  seo: {
    title: "About Sleeky Programmers — Software Company in Akoka, Lagos",
    description:
      "Sleeky Programmers is a software company in Akoka, Lagos, founded in 2023, designing and building websites, apps and automation for ambitious businesses.",
  },
  hero: {
    eyebrow: "About us · Akoka, Lagos",
    headline: "Built in Lagos.\nBuilt for\n*ambitious* business.",
    intro:
      "Sleeky Programmers is a software company founded in January 2023. We design and build websites, apps and automation with one aim: software that exceeds what its users expect, and pays for itself in the time it saves.",
    badge: "EST. 2023 · AKOKA · LAGOS · NIGERIA ·",
  },
  studio: {
    foundedYear: "2023",
    foundedCaption: "Founded in Akoka, Lagos",
  },
  mission: {
    label: "Our mission",
    text: "To exceed user expectations by building software around how people actually behave —",
    mutedText: "and to set a new standard for software made in Nigeria.",
  },
  values: {
    heading: "What we\n*stand for*",
    items: [
      { title: "Excellence", description: "The highest quality in every part of the development process." },
      { title: "Integrity", description: "Honesty and strong principles in how we do business and build software." },
      { title: "Value", description: "Products that make a real, measurable difference for clients and their users." },
      { title: "Leadership", description: "Leading by example — innovating and setting the pace in our industry." },
    ],
  },
  team: {
    heading: "The *team*",
    intro: "Designers and engineers who care about the details your customers notice.",
    members: [{ name: "Michael Ogbuma" }],
  },
  visit: { label: "Visit the studio" },
  closing: { heading: "Work with us." },
};
