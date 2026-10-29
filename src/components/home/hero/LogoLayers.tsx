import { LOGOMARK_PATH, LOGOMARK_VIEWBOX } from "@/components/ui/icons";

const LAYER_COUNT = 10;

// Layered CSS version of the 3D logomark from the design canvas. It is the
// first paint and the fallback when WebGL is skipped (brief 5.1).
const layers = Array.from({ length: LAYER_COUNT }, (_, i) => {
    const front = i === LAYER_COUNT - 1;
    const t = i / (LAYER_COUNT - 1);
    const r = Math.round(20 + (88 - 20) * t);
    const g = Math.round(90 + (214 - 90) * t);
    const b = Math.round(55 + (141 - 55) * t);
    return {
        fill: front ? "#58D68D" : `rgb(${r},${g},${b})`,
        z: (i - (LAYER_COUNT - 1)) * 5,
        front,
    };
});

const LogoLayers = () => (
    <div className="obj relative h-[330px] w-[min(440px,80vw)]">
        {layers.map((layer) => (
            <svg
                key={layer.z}
                viewBox={LOGOMARK_VIEWBOX}
                className="absolute inset-0 h-full w-full overflow-visible"
                style={{
                    transform: `translateZ(${layer.z}px)`,
                    filter: layer.front ? "drop-shadow(0 0 28px #58D68D88)" : undefined,
                }}
            >
                <path fillRule="evenodd" clipRule="evenodd" fill={layer.fill} d={LOGOMARK_PATH} />
            </svg>
        ))}
    </div>
);

export default LogoLayers;
