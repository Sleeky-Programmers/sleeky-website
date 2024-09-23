"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useEffect(() => {
        gsap.fromTo(
            ".about-item",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".about-item",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div id="about-us" className="px-4 md:px-[40px] py-2">
            <div className="flex flex-col items-center justify-center about-item">
                <div className="bg-green w-[100px] h-[4px] rounded-full" />
                <h1 className="font-bold text-3xl md:text-4xl mt-3 text-blue-dark">
                    About Us
                </h1>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-3 about-item">
                    <Image
                        src="/assets/about-1.jpeg"
                        alt="About 1"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover w-full md:w-[300px] h-[200px] md:h-[300px]"
                    />
                    <Image
                        src="/assets/about-2.jpeg"
                        alt="About 2"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover w-full md:w-[300px] h-[200px] md:h-[300px] lg:block hidden"
                    />
                </div>

                <div className="flex flex-col items-center md:items-start justify-center flex-1 text-center md:text-left about-item">
                    <h1 className="font-black text-blue-dark text-3xl md:text-4xl">
                        Sleeky Programmers Ltd.
                    </h1>
                    <p className="text-blue-dark mt-2">
                        Sleeky Programmers Ltd. delivers innovative software focused on
                        exceptional user experience, leveraging human behavior and insights to
                        exceed expectations.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-5 about-item">
                <Image
                    src="/assets/about-3.jpeg"
                    alt="About 3"
                    width={300}
                    height={200}
                    className="w-full md:w-[300px] h-[200px] md:h-[200px] rounded-lg object-cover flex-1"
                />
                <Image
                    src="/assets/about-4.jpeg"
                    alt="About 4"
                    width={300}
                    height={200}
                    className="w-full md:w-[300px] h-[200px] md:h-[200px] rounded-lg object-cover flex-1"
                />
            </div>
        </div>
    );
};

export default About;
