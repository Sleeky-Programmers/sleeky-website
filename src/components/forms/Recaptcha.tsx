"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { config } from "@/config";

declare global {
    interface Window {
        grecaptcha?: {
            render: (container: HTMLElement, options: Record<string, unknown>) => number;
            reset: (widgetId?: number) => void;
        };
        onRecaptchaLoad?: () => void;
    }
}

export type RecaptchaHandle = { reset: () => void };

type RecaptchaProps = {
    onToken: (token: string) => void;
};

const RECAPTCHA_SCRIPT_ID = "recaptcha-script";

// Google reCAPTCHA v2 checkbox. Tokens are single-use, so call reset() after every submit.
const Recaptcha = forwardRef<RecaptchaHandle, RecaptchaProps>(({ onToken }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const onTokenRef = useRef(onToken);
    onTokenRef.current = onToken;

    useImperativeHandle(ref, () => ({
        reset: () => {
            if (window.grecaptcha && widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
            onTokenRef.current("");
        },
    }));

    useEffect(() => {
        const render = () => {
            if (!containerRef.current || widgetId.current !== null || !window.grecaptcha) return;
            widgetId.current = window.grecaptcha.render(containerRef.current, {
                sitekey: config.RECAPTCHA_SITE_KEY,
                theme: "dark",
                callback: (token: string) => onTokenRef.current(token),
                "expired-callback": () => onTokenRef.current(""),
            });
        };

        if (window.grecaptcha?.render) {
            render();
            return;
        }

        window.onRecaptchaLoad = render;

        if (!document.getElementById(RECAPTCHA_SCRIPT_ID)) {
            const script = document.createElement("script");
            script.id = RECAPTCHA_SCRIPT_ID;
            script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    return <div ref={containerRef} />;
});

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;
