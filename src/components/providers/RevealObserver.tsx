"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fallback for browsers without scroll-driven animations (Safari, Firefox):
// reveals `.rv` and `.line` elements as they enter the viewport.
const RevealObserver = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (CSS.supports("animation-timeline: view()")) return;

        const root = document.documentElement;
        root.classList.add("js-reveal");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px" });

        const observeAll = () => {
            document.querySelectorAll(".rv:not(.is-in), .line:not(.is-in)").forEach((el) => observer.observe(el));
        };

        observeAll();
        const mutations = new MutationObserver(observeAll);
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
        };
    }, [pathname]);

    return null;
}

export default RevealObserver;
