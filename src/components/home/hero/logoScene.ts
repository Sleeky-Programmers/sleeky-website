import {
    AmbientLight,
    Color,
    DirectionalLight,
    ExtrudeGeometry,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGOMARK_PATH, LOGOMARK_VIEWBOX } from "@/components/ui/icons";

// WebGL hero (brief 5.1): the Sleeky logomark extruded in 3D, slowly rotating
// and leaning towards the cursor, lit with a green glow. Loaded lazily after
// first paint, so it never counts against the initial JavaScript budget.

const GREEN = "#58D68D";
const LOGO_WIDTH = 234;
const WORLD_WIDTH = 3.4;

export function mountLogoScene(container: HTMLElement, onReady: () => void): () => void {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGOMARK_VIEWBOX}"><path fill-rule="evenodd" d="${LOGOMARK_PATH}"/></svg>`;
    const shapes = new SVGLoader().parse(svg).paths.flatMap((path) => SVGLoader.createShapes(path));

    const geometry = new ExtrudeGeometry(shapes, {
        depth: 34,
        bevelEnabled: true,
        bevelThickness: 4,
        bevelSize: 2.5,
        bevelSegments: 4,
        curveSegments: 10,
    });
    geometry.center();
    // SVG y points down; a half-turn around X flips it upright without mirroring the faces.
    geometry.rotateX(Math.PI);
    const scale = WORLD_WIDTH / LOGO_WIDTH;
    geometry.scale(scale, scale, scale);

    const material = new MeshStandardMaterial({
        color: new Color(GREEN),
        emissive: new Color("#1d6b43"),
        emissiveIntensity: 0.45,
        metalness: 0.35,
        roughness: 0.28,
    });
    const logo = new Mesh(geometry, material);
    scene.add(logo);

    scene.add(new AmbientLight(0xffffff, 0.45));
    const key = new DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 6);
    scene.add(key);
    const glow = new PointLight(GREEN, 28, 20, 1.6);
    glow.position.set(-3, -2, 3);
    scene.add(glow);
    const rim = new DirectionalLight(GREEN, 1.6);
    rim.position.set(0, 2, -5);
    scene.add(rim);

    const resize = () => {
        const { clientWidth: width, clientHeight: height } = container;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const pointer = { x: 0, y: 0 };
    const lean = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
    });
    visibility.observe(container);
    const onVisibilityChange = () => !document.hidden && schedule();
    document.addEventListener("visibilitychange", onVisibilityChange);

    let frame = 0;
    let readyFired = false;
    const start = performance.now();

    function schedule() {
        if (!frame) frame = requestAnimationFrame(render);
    }

    function render(now: number) {
        frame = 0;
        const t = (now - start) / 1000;
        const cycle = (t / 14) * Math.PI * 2;

        lean.x += (pointer.x - lean.x) * 0.05;
        lean.y += (pointer.y - lean.y) * 0.05;

        logo.rotation.y = Math.sin(cycle) * 0.5 + lean.x * 0.35;
        logo.rotation.x = Math.cos(cycle) * 0.18 + lean.y * 0.2;
        logo.position.y = Math.sin(t * 0.45) * 0.08;

        renderer.render(scene, camera);

        if (!readyFired) {
            readyFired = true;
            onReady();
        }
        if (visible && !document.hidden) schedule();
    }

    schedule();

    return () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibility.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
    };
}
