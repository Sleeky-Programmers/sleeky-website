export const config = {
  BASE_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://sleeky-website-contact-api.vercel.app",
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  // NEXT_PUBLIC_RECAPTCHA_DISABLED=true hides the captcha for testing (local or Vercel preview).
  // Ignored on production deployments; the API has the same switch (RECAPTCHA_DISABLED).
  RECAPTCHA_DISABLED:
    process.env.NEXT_PUBLIC_RECAPTCHA_DISABLED === "true" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "production",
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
};
