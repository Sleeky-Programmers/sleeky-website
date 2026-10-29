import Link from "next/link";
import { ArrowRight, ChatBubble } from "./icons";

type Variant = "primary" | "outline" | "white" | "whatsapp";
type Size = "md" | "lg";

type ButtonLinkProps = {
    href: string;
    children: React.ReactNode;
    variant?: Variant;
    size?: Size;
    arrow?: boolean;
    whatsappIcon?: boolean;
    trackLocation?: string;
    className?: string;
};

const variants: Record<Variant, string> = {
    primary: "bg-green text-ink font-semibold hover:text-ink",
    outline: "border border-slate text-white font-medium hover:text-white",
    white: "bg-white text-ink font-semibold hover:text-ink",
    whatsapp: "bg-whatsapp text-ink font-semibold hover:text-ink",
};

const sizes: Record<Size, string> = {
    md: "px-7 py-4 text-base",
    lg: "px-[30px] py-[18px] text-[17px]",
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

const ButtonLink = ({ href, children, variant = "primary", size = "lg", arrow, whatsappIcon, trackLocation, className = "" }: ButtonLinkProps) => {
    const classes = `btn inline-flex items-center gap-3 rounded-full no-underline ${variants[variant]} ${sizes[size]} ${className}`;
    const content = (
        <>
            {whatsappIcon && <ChatBubble />}
            {children}
            {arrow && <ArrowRight />}
        </>
    );

    if (isExternal(href)) {
        const newTab = href.startsWith("http");
        return (
            <a
                href={href}
                className={classes}
                data-track-location={trackLocation}
                {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {content}
            </a>
        );
    }

    return <Link href={href} className={classes}>{content}</Link>;
}

export default ButtonLink;
