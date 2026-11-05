type IconProps = {
    size?: number;
    className?: string;
    strokeWidth?: number;
    color?: string;
};

const base = (size: number, strokeWidth: number, color: string, className?: string) => ({
    "aria-hidden": true,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
});

export const ArrowRight = ({ size = 18, strokeWidth = 2.2, color = "currentColor", className }: IconProps) => (
    <svg {...base(size, strokeWidth, color, className)}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export const ArrowUpRight = ({ size = 18, strokeWidth = 2.2, color = "currentColor", className }: IconProps) => (
    <svg {...base(size, strokeWidth, color, className)}><path d="M7 17L17 7M9 7h8v8" /></svg>
);

export const ChatBubble = ({ size = 18, strokeWidth = 2, color = "#58D68D", className }: IconProps) => (
    <svg {...base(size, strokeWidth, color, className)}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z" /></svg>
);

export const Check = ({ size = 16, strokeWidth = 2.5, color = "#58D68D", className }: IconProps) => (
    <svg {...base(size, strokeWidth, color, className)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const Paperclip = ({ size = 22, strokeWidth = 2, color = "#58D68D", className }: IconProps) => (
    <svg {...base(size, strokeWidth, color, className)}><path d="M21 12.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5" /></svg>
);

export const Sparkle = ({ size = 18, className }: { size?: number; className?: string }) => (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className}><path d="M12 2l3 10-3 10-3-10z" fill="#58D68D" /></svg>
);

/** The Sleeky logomark path, shared by the hero, card watermarks and the WebGL scene */
export const LOGOMARK_PATH =
    "M187.409 62.395H156.616L201.146 132.686L156.616 202.978H187.409C188.426 202.978 189.311 202.49 189.864 201.626L232.535 134.238C233.155 133.263 233.155 132.088 232.535 131.113L189.864 63.7246C189.311 62.8604 188.426 62.3729 187.409 62.3729M108.393 67.7578L149.538 132.709L129.54 164.264C128.987 165.129 128.103 165.616 127.085 165.616C126.067 165.616 125.182 165.129 124.629 164.264L83.4845 99.3135L103.482 67.7578C104.035 66.8935 104.92 66.406 105.937 66.406C106.955 66.406 107.84 66.8935 108.393 67.7578ZM135.778 62.395H112.153C111.069 62.395 110.14 61.841 109.609 60.8882C109.078 59.9353 109.123 58.8494 109.698 57.9187L128.014 29H97.2217C96.2041 29 95.3192 29.4875 94.7661 30.3517L52.0949 97.7402C51.4755 98.7152 51.4755 99.8897 52.0949 100.865L94.7661 168.253C95.3192 169.117 96.2041 169.605 97.2217 169.605H120.847C121.931 169.605 122.86 170.159 123.391 171.112C123.922 172.065 123.877 173.151 123.302 174.081L104.986 203H135.778C136.796 203 137.681 202.513 138.234 201.648L180.905 134.26C181.524 133.285 181.524 132.11 180.905 131.135L138.234 63.7468C137.681 62.8826 136.796 62.395 135.778 62.395ZM45.5913 29.0221H76.3836L31.8542 99.3135L76.3836 169.605H45.5913C44.5738 169.605 43.689 169.117 43.1359 168.253L0.46454 100.865C-0.154847 99.8897 -0.154847 98.7152 0.46454 97.7402L43.1359 30.3517C43.689 29.4875 44.5738 29 45.5913 29V29.0221Z";

export const LOGOMARK_VIEWBOX = "0 28 234 176";

export const LogomarkWatermark = ({ fill, opacity }: { fill: string; opacity: number }) => (
    <svg
        aria-hidden="true"
        viewBox={LOGOMARK_VIEWBOX}
        className="pointer-events-none absolute -bottom-10 -right-[60px] w-[340px]"
        style={{ opacity }}
    >
        <path fill={fill} fillRule="evenodd" d={LOGOMARK_PATH} />
    </svg>
);
