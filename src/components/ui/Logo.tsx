import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type LogoProps = {
    height?: number;
    label?: string;
    priority?: boolean;
};

const Logo = ({ height = 40, label = "Sleeky Programmers home", priority = false }: LogoProps) => {
    const width = Math.round((site.logo.width / site.logo.height) * height);

    return (
        <Link href="/" aria-label={label} className="block leading-none">
            <Image
                src={site.logo.onDark}
                alt="Sleeky Programmers"
                width={width}
                height={height}
                priority={priority}
                unoptimized
                style={{ height, width: "auto" }}
            />
        </Link>
    );
}

export default Logo;
