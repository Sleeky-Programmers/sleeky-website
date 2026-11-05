"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 90];

// Sends scroll_depth once per milestone per page view, so the CMS can show how
// far people read each page. Only counts real scrolling (a short page that fits
// the screen sends nothing).
const ScrollTracker = () => {
    const pathname = usePathname();

    useEffect(() => {
        const reached = new Set<number>();
        let frame = 0;

        const measure = () => {
            frame = 0;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            const percent = (window.scrollY / scrollable) * 100;
            for (const milestone of MILESTONES) {
                if (percent >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    track("scroll_depth", { percent: milestone });
                }
            }
        };
        const onScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(measure);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [pathname]);

    return null;
};

export default ScrollTracker;
