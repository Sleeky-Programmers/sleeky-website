export const config = {
  BASE_API_URL: "https://sleeky-website-contact-api.vercel.app",

  handleScrollTo: (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  },
};
