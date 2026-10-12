export const config = {
  BASE_API_URL: "https://sleeky-website-contact-api.vercel.app",
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",

  handleScrollTo: (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  },
};
