import type { CaseStudyImage, TeamMember } from "../types";

// About page content from the design canvas.

export const values = [
  { title: "Excellence", description: "The highest quality in every part of the development process." },
  { title: "Integrity", description: "Honesty and strong principles in how we do business and build software." },
  { title: "Value", description: "Products that make a real, measurable difference for clients and their users." },
  { title: "Leadership", description: "Leading by example — innovating and setting the pace in our industry." },
];

// The team section appears once every member has a role (brief section 9:
// team photography and details are still "Open"). Add the rest of the team here.
export const team: TeamMember[] = [{ name: "Michael Ogbuma" }];

// Studio photos for the photo band. Until supplied, branded tiles are shown.
export const studioPhotos: { wide?: CaseStudyImage; detail?: CaseStudyImage } = {};
