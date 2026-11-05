# Sleeky Programmers Ltd. Website

## Get Started

1. Clone the repository in your terminal
2. Change current directory to the project's directory
3. Run `npm install` to install all packages
4. Open it in your code editor:
   For VSCode - run `code .`
5. Run `npm run dev` to continue in development mode

## Content and the Sleeky CMS

All text, case studies, articles and contact details are read through `src/lib/content`. Where they come from depends on one setting:

- **`CMS_API_URL` set** (the CMS's address, e.g. `https://cms.sleekyprogrammers.com`): content comes from the Sleeky CMS's public API. Pages are cached and refreshed at least every minute, and straight away when the CMS reports a change. (A refresh happens in the background: the first visit after it's due still sees the cached page, the next one sees the new text.)
- **`CMS_API_URL` not set:** content comes from the files in `src/lib/content/data` (the original website copy). Useful before the CMS is deployed and for local work without it.

If the CMS is set but can't be reached, the request fails rather than falling back, so the website keeps serving the last good version of each page instead of older local text. A build needs the CMS to be reachable.

### Instant updates from the CMS

After a change, the CMS sends `POST /api/revalidate` with `Authorization: Bearer <REVALIDATE_SECRET>` and `{ "type": "insights" | "case-studies" | "pages", "slugs": [...] }`, and the matching cached content is cleared.

Set up both sides with the **same** secret:

| Where | Variable | Value |
|---|---|---|
| Website | `REVALIDATE_SECRET` | A random string of 16+ characters, e.g. from `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| CMS | `REVALIDATE_SECRET` | The same string |
| CMS | `WEBSITE_REVALIDATE_URL` | `https://sleekyprogrammers.com/api/revalidate` (or the preview's address) |

Without these, changes still appear within about a minute.

For a **protected preview** (Vercel Authentication on), the ping also needs the website project's bypass key: copy the secret from this project's Settings → Deployment Protection → Protection Bypass for Automation into the CMS's `WEBSITE_PROTECTION_BYPASS`. It must be the *website* project's secret, not the CMS's own.

### Environment variables

| Variable | Purpose |
|---|---|
| `CMS_API_URL` | The CMS's address; leave unset to use the local content files |
| `REVALIDATE_SECRET` | Shared secret for `/api/revalidate` (server-only, never `NEXT_PUBLIC_`) |
| `NEXT_PUBLIC_BASE_URL` | The website's own address, for canonical links and the sitemap |
| `NEXT_PUBLIC_API_URL` | The contact/brief API |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_RECAPTCHA_DISABLED` | reCAPTCHA (the switch is ignored in production) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics (loads only after cookie consent) |

### Notes

- **Headings** edited in the CMS use a small convention: a new line starts a new line on the page and `*words in asterisks*` are green (`src/components/ui/Highlight.tsx`).
- **Work** (`/work`) opens the first case study in the CMS's order, so reordering or renaming case studies never breaks the menu link.
- **Images** uploaded in the CMS are served from Cloudinary (`res.cloudinary.com`, allowed in `next.config.mjs`).
- The floating WhatsApp button is deliberately fixed and not driven by the CMS.
