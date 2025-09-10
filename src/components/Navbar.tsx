"use client";

import { useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import gsap from "gsap";
import { config } from "@/config";

const Navbar = () => {
  const navLinks = [
    { id: 1, linkText: "Home", href: "home", isActive: true },
    { id: 2, linkText: "About Us", href: "about-us", isActive: false },
    { id: 3, linkText: "Services", href: "services", isActive: false },
  ];

  useEffect(() => {
    gsap.fromTo(".nav", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
  }, []);

  return (
    <nav className="nav flex items-center justify-between py-4 bg-white shadow-lg px-6 lg:px-20 xl:px-36 2xl:px-48 hidden-before-animation">
      <Image
        src="/assets/logo.png"
        alt="Sleeky Programmers Logo"
        width={130}
        height={70}
      />

      <ul className="hidden md:flex items-center justify-center gap-4 lg:gap-8">
        {navLinks.map(link => (
          <li
            key={link.id}
            className={`hover:font-bold hover:border-b-2 border-b-green transition-all cursor-pointer ${link.isActive ? 'border-b-2 font-bold' : ''} text-sm md:text-base lg:text-lg`}
            onClick={() => config.handleScrollTo(link.href)}
          >
            {link.linkText}
          </li>
        ))}
      </ul>

      <Button
      text="Contact Us"
      onClick={() => config.handleScrollTo("contact-us")}
      />
    </nav>
  );
}

export default Navbar;
