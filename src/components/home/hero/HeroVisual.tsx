"use client";

import { useEffect, useRef, useState } from "react";
import LogoLayers from "./LogoLayers";

type NavigatorHints = Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
};

// Only load WebGL where it will run smoothly (brief 5.1): no reduced motion,
// no data saver or slow connection, and a reasonably capable device.
function canUseWebGL(): boolean {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

    const nav = navigator as NavigatorHints;
    if (nav.connection?.saveData) return false;
    if (nav.connection?.effectiveType && /(^|-)2g|3g/.test(nav.connection.effectiveType)) return false;
    if ((nav.hardwareConcurrency || 4) < 4) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;

    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
        return false;
    }
}

const HeroVisual = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [webglReady, setWebglReady] = useState(false);
    const [layersRemoved, setLayersRemoved] = useState(false);

    // Once the WebGL scene has faded in, stop animating the hidden CSS version.
    useEffect(() => {
        if (!webglReady) return;
        const timer = window.setTimeout(() => setLayersRemoved(true), 800);
        return () => window.clearTimeout(timer);
    }, [webglReady]);

    useEffect(() => {
        if (!canUseWebGL()) return;

        let cancelled = false;
        let cleanup: (() => void) | undefined;

        const load = () => {
            import("./logoScene")
                .then(({ mountLogoScene }) => {
                    if (cancelled || !sceneRef.current) return;
                    cleanup = mountLogoScene(sceneRef.current, () => setWebglReady(true));
                })
                .catch(() => {
                    // Keep the CSS logomark if the scene fails to load.
                });
        };

        const idle = window.requestIdleCallback
            ? window.requestIdleCallback(load, { timeout: 2500 })
            : window.setTimeout(load, 1200);

        return () => {
            cancelled = true;
            if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
            else window.clearTimeout(idle);
            cleanup?.();
        };
    }, []);

    return (
        <div aria-hidden="true" className="stage relative flex h-[380px] min-w-0 flex-[1_1_420px] items-center justify-center md:h-[520px]">
            {!layersRemoved && (
                <div className={`transition-opacity duration-700 ${webglReady ? "opacity-0" : "opacity-100"}`}>
                    <LogoLayers />
                </div>
            )}
            <div
                ref={sceneRef}
                className={`absolute inset-0 transition-opacity duration-700 ${webglReady ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
}

export default HeroVisual;
