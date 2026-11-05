import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

const Breadcrumbs = ({ items, className = "" }: { items: Crumb[]; className?: string }) => {
    const trail = [{ name: "Home", path: "/" }, ...items];

    return (
        <>
            <JsonLd data={breadcrumbJsonLd(trail)} />
            <nav aria-label="Breadcrumb" className={`fi relative text-sm text-muted ${className}`}>
                <ol className="flex flex-wrap items-center gap-2.5">
                    {trail.map((crumb, index) => {
                        const last = index === trail.length - 1;
                        return (
                            <li key={crumb.path} className="flex items-center gap-2.5">
                                {last ? (
                                    <span aria-current="page" className="text-white">{crumb.name}</span>
                                ) : (
                                    <>
                                        <Link href={crumb.path} className="text-muted no-underline transition-colors hover:text-white">{crumb.name}</Link>
                                        <span aria-hidden="true">/</span>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

export default Breadcrumbs;
