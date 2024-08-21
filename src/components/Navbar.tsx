"use client";

import { useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import gsap from "gsap";

const Navbar = () => {
    const navLinks = [
        { id: 1, linkText: "Home", href: "home" },
        { id: 2, linkText: "About Us", href: "about-us" },
        { id: 3, linkText: "Services", href: "services" },
        { id: 4, linkText: "Blog", href: "blog" },
    ];

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        gsap.fromTo(".nav", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
    }, []);

    return (
        <nav className="hidden-before-animation nav flex flex-row items-center justify-between py-4 md:px-[40px] px-[20px] shadow-lg bg-white">
            <Image
                src="/assets/logo.png"
                alt="Sleeky Programmers Logo"
                width={130}
                height={70}
            />

            <ul className="flex-row items-center justify-center gap-4 md:flex hidden">
                {navLinks.map(link => (
                    <li
                        key={link.id}
                        className="hover:font-bold hover:border-b-2 border-b-green transition-all cursor-pointer"
                        onClick={() => handleScrollTo(link.href)}
                    >
                        {link.linkText}
                    </li>
                ))}
            </ul>

            <Button 
                text="Contact Us"
                onClick={() => { }}
            />
        </nav>
    );
}

export default Navbar;
