import Image from "next/image";
import type { CaseStudyImage } from "@/lib/content/types";

type BrowserFrameProps = {
    image?: CaseStudyImage;
    placeholderLabel: string;
    className?: string;
    sizes?: string;
};

// Browser-window frame for case-study screenshots. Shows a neutral placeholder
// until the screenshot is supplied.
const BrowserFrame = ({ image, placeholderLabel, className = "", sizes = "(min-width: 1024px) 50vw, 90vw" }: BrowserFrameProps) => (
    <div className={`zoom overflow-hidden rounded-t-2xl border border-slate bg-white shadow-[0_30px_80px_#00000080] ${className}`}>
        <div className="flex h-7 items-center gap-1.5 bg-[#E9EDF1] px-3">
            <span className="h-[9px] w-[9px] rounded-full bg-[#C5CDD5]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#C5CDD5]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#C5CDD5]" />
        </div>
        {image ? (
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="block h-auto w-full" />
        ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-[#F4F6F8] p-6 text-center">
                <span className="font-display text-2xl font-bold tracking-tight text-[#2C3E50]/70">{placeholderLabel}</span>
            </div>
        )}
    </div>
);

export default BrowserFrame;
