export const config = {
  BASE_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://sleeky-website-contact-api.vercel.app",
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  HUBSPOT_PORTAL_ID: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "",
  // Sleeky's HubSpot account is hosted in the EU, which serves its tracking script from js-eu1.
  HUBSPOT_SCRIPT_HOST: process.env.NEXT_PUBLIC_HUBSPOT_SCRIPT_HOST || "js-eu1.hs-scripts.com",
};
