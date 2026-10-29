"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
    `${site.address.street}, ${site.address.locality}, ${site.address.region}`,
)}&output=embed`;

// Google Maps sets its own cookies, so the map only loads when the visitor asks for it.
const StudioMap = () => {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return (
            <iframe
                title={`Map: ${site.address.street}, ${site.address.locality}, ${site.address.region}`}
                src={EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full min-h-[360px] w-full border-0"
            />
        );
    }

    return (
        <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 bg-chip p-8 text-center">
            <p className="m-0 text-[15px] text-muted">{site.address.street}, {site.address.locality}</p>
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    className="rounded-full border border-slate px-5 py-3 text-[15px] font-medium text-white transition-colors hover:border-green"
                >
                    Show map
                </button>
                <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green px-5 py-3 text-[15px] font-semibold text-ink no-underline"
                >
                    Get directions
                </a>
            </div>
            <p className="m-0 max-w-[320px] text-xs text-faint">Showing the map loads Google Maps, which may set cookies.</p>
        </div>
    );
}

export default StudioMap;
