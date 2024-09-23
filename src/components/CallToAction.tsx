"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
    useEffect(() => {
        gsap.fromTo(
            ".cta-heading",
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: ".cta-heading" }
        );

        gsap.fromTo(
            ".cta-text",
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, scrollTrigger: ".cta-text" }
        );

        gsap.fromTo(
            ".cta-contact",
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, scrollTrigger: ".cta-contact" }
        );
    }, []);

    const socialMediaLinks = [
        { name: 'facebook', link: 'https://www.facebook.com/profile.php?id=61565977402117&mibextid=ZbWKwL' },
        { name: 'instagram', link: 'https://www.instagram.com/sleekyprogrammers?igsh=c2x4cTU1eGY5aGdj' },
        { name: 'twitter', link: 'https://x.com/sleekydevs?s=09' },
        { name: 'linkedin', link: 'https://www.linkedin.com/company/sleeky-programmers-limited/' },
    ]

    return (
        <div className="bg-gray-50 px-4 md:px-[40px] py-6 ">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex flex-col items-start justify-center gap-3 text-center md:text-left">
                    <div className="bg-gray-200 p-2 flex items-center justify-center rounded-full">
                        <Image
                            src="/assets/logo-1.png"
                            alt="Logo"
                            width={30}
                            height={30}
                        />
                    </div>
                    <h1 className="font-black text-blue-dark text-4xl cta-heading">Let&rsquo;s collaborate</h1>
                    <p className="text-xl leading-8 cta-text">For inquiries and support, reach out to Sleeky Programmers Ltd. with the information below</p>
                </div>
                <Image
                    src="/assets/map.png"
                    alt="Map"
                    width={500}
                    height={300}
                    className="w-full md:w-[500px] h-auto cta-image"
                />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
                <div className="flex-1 text-center md:text-left cta-contact">
                    <p className="text-xl font-bold">Follow us</p>
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                        {socialMediaLinks.map((platform) => (
                            <Link key={platform.name} href={platform.link}>
                                <div className="flex items-center justify-center p-3 rounded-full shadow-md">
                                    <Image
                                        src={`/assets/${platform.name}.png`}
                                        alt={platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
                                        width={13}
                                        height={13}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 border-t-2 md:border-t-0 md:border-l-2 md:border-r-2 border-gray-200 pt-4 md:pt-0 cta-contact">
                    <Image 
                        src="/assets/envelope.png"
                        alt="Phone"
                        width={23} 
                        height={23} 
                    />
                    <p>+234 806 075 6080</p>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 cta-contact">
                    <Image 
                        src="/assets/location.png" 
                        alt="Location"
                        width={23} 
                        height={23} 
                    />
                    <p className="text-center md:text-left">
                        4C, Drive 4, Prince and Princess <br /> Estate, Kaura District, Abuja.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;
