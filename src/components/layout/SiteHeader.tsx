"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { mainNav } from "@/lib/site";

const SiteHeader = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const close = () => setOpen(false);
    const isCurrent = (section: string) => pathname === section || pathname.startsWith(`${section}/`);

    return (
        <header className="relative z-20">
            <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-6 py-7">
                <Logo priority />

                <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] md:flex">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="nl text-soft"
                            aria-current={isCurrent(item.section) ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/start-a-project" className="btn rounded-full bg-green px-[22px] py-[13px] font-semibold text-ink">
                        Start a project
                    </Link>
                </nav>

                <button
                    type="button"
                    className="rounded-full border border-slate px-5 py-3 text-[15px] font-medium md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {open && (
                <nav
                    id="mobile-nav"
                    aria-label="Main"
                    className="step-in absolute inset-x-4 top-full rounded-3xl border border-line bg-surface p-6 shadow-[0_30px_80px_#00000099] md:hidden"
                >
                    <ul className="flex flex-col">
                        {mainNav.map((item) => (
                            <li key={item.href} className="border-b border-line last:border-0">
                                <Link
                                    href={item.href}
                                    onClick={close}
                                    className="block py-4 font-display text-3xl font-bold tracking-tight text-white aria-[current=page]:text-green"
                                    aria-current={isCurrent(item.section) ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/start-a-project" onClick={close} className="mt-5 block rounded-full bg-green px-6 py-4 text-center font-semibold text-ink">
                        Start a project
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default SiteHeader;
