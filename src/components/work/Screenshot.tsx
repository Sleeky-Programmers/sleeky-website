import Image from "next/image";
import type { CaseStudyImage } from "@/lib/content/types";
import { LOGOMARK_PATH, LOGOMARK_VIEWBOX } from "@/components/ui/icons";

type ScreenshotProps = {
    image?: CaseStudyImage;
    /** Shown in the placeholder until the screenshot is supplied */
    label: string;
    className?: string;
    sizes?: string;
    priority?: boolean;
    /** Browser chrome bar above the image */
    chrome?: "none" | "sm" | "lg";
};

// Framed product screenshot, with a neutral branded placeholder until the real image is added.
const Screenshot = ({ image, label, className = "", sizes = "(min-width: 1024px) 50vw, 90vw", priority, chrome = "none" }: ScreenshotProps) => (
    <div className={`zoom overflow-hidden border border-slate bg-white ${className}`}>
        {chrome !== "none" && (
            <div className={`flex items-center bg-[#E9EDF1] ${chrome === "lg" ? "h-9 gap-2 px-4" : "h-7 gap-1.5 px-3"}`}>
                {[0, 1, 2].map((dot) => (
                    <span key={dot} className={`rounded-full bg-[#C5CDD5] ${chrome === "lg" ? "h-[11px] w-[11px]" : "h-[9px] w-[9px]"}`} />
                ))}
            </div>
        )}
        {image ? (
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
        ) : (
            <div className="flex aspect-[16/10] flex-col items-center justify-center gap-4 bg-[#F4F6F8] p-6 text-center">
                <svg aria-hidden="true" viewBox={LOGOMARK_VIEWBOX} className="w-16 opacity-30">
                    <path fill="#2C3E50" fillRule="evenodd" d={LOGOMARK_PATH} />
                </svg>
                <span className="font-display text-xl font-bold tracking-tight text-[#2C3E50]/70">{label}</span>
            </div>
        )}
    </div>
);

export default Screenshot;
