import type { Service } from "@/lib/content/types";

// "A typical sale, automated" diagram from the Service page design: five steps
// around a loop, with the middle step highlighted and a running dashed line.
const boxes = [
    { x: 10, y: 26, w: 100, h: 48 },
    { x: 180, y: 26, w: 110, h: 48 },
    { x: 290, y: 120, w: 120, h: 50, highlight: true },
    { x: 180, y: 226, w: 110, h: 48 },
    { x: 10, y: 226, w: 100, h: 48 },
];

const ServiceFlow = ({ flow }: { flow: Service["flow"] }) => (
    <div className="fi min-w-0 max-w-[540px] flex-[1_1_440px] rounded-[28px] border border-line bg-surface p-8">
        <p className="m-0 text-[13px] uppercase tracking-[0.12em] text-muted">{flow.title}</p>
        <svg
            role="img"
            aria-label={`${flow.title}: ${flow.steps.join(", then ")}.`}
            viewBox="0 0 460 300"
            className="mt-5 block h-auto w-full"
            fontFamily="var(--font-inter), Inter, sans-serif"
            fontSize="13"
        >
            <path className="flowline" d="M110 50H180M290 50H350V120M350 170V230H290M180 250H110" fill="none" stroke="#58D68D" strokeWidth="2" />
            {boxes.map((box, index) => (
                <g key={index}>
                    <rect
                        x={box.x}
                        y={box.y}
                        width={box.w}
                        height={box.h}
                        rx="12"
                        fill={box.highlight ? "#0F2219" : "#13202B"}
                        stroke={box.highlight ? "#58D68D" : "#2C3E50"}
                    />
                    <text x={box.x + box.w / 2} y={box.y + box.h / 2 + 5} textAnchor="middle" fill="#FFFFFF">{flow.steps[index]}</text>
                </g>
            ))}
            <text x="60" y="160" textAnchor="middle" fill="#9AA7B4" fontSize="12">{flow.note}</text>
        </svg>
    </div>
);

export default ServiceFlow;
