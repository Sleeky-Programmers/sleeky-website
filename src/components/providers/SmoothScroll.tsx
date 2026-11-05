"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        let frame = requestAnimationFrame(function loop(time: number) {
            lenis.raf(time);
            frame = requestAnimationFrame(loop);
        });

        // Glide to sections on the current page (e.g. the navbar's /#work links)
        // instead of jumping. Links to other pages are left to the router.
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const link = (event.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
            if (!link || link.target === "_blank") return;

            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

            const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
            if (!section) return;

            event.preventDefault();
            lenis.scrollTo(section, { offset: -16 });
            window.history.pushState(null, "", url.hash);
        };
        document.addEventListener("click", onClick, { capture: true });

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("click", onClick, { capture: true });
            lenis.destroy();
        };
    }, []);

    return null;
}

export default SmoothScroll;
