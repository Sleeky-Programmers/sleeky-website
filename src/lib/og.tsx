import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Sleeky Programmers — Software that grows your business.";

// Shared Open Graph / X card image (brief 6.1). Runs on the Edge runtime, so the
// logo is bundled with `new URL(..., import.meta.url)` rather than read from disk.
export async function renderOgImage() {
  const logo = await fetch(new URL("../../public/brand/logo-on-dark.svg", import.meta.url)).then((res) => res.text());
  const logoSrc = `data:image/svg+xml;base64,${btoa(logo)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 20%, rgba(88,214,141,0.28), #070B10 55%)",
          color: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={252} height={90} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.045em", display: "flex", flexDirection: "column" }}>
            <span>Software that</span>
            <span><span style={{ color: "#58D68D" }}>grows</span>&nbsp;your business.</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 30, color: "#9AA7B4" }}>Websites · Apps · Automation — Lagos, Nigeria</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
