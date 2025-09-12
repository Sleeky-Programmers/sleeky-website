"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import Button from "./Button";
import { config } from '@/config';

type BackgroundDataCardProps = {
    src: string;
    text: string;
    subText: string;
    className?: string;
}

const BackgroundDataCard = ({ src, text, subText, className }: BackgroundDataCardProps) => {
    return (
        <div className={`flex items-center gap-4 bg-white shadow-2xl px-4 py-3 rounded-lg hidden-before-animation ${className} w-[200px] sm:w-[220px] md:w-[240px] lg:w-[300px]`}>
            <Image
                src={src}
                alt={text}
                width={20}
                height={20}
            />
            <div>
                <p className="font-bold text-xs sm:text-sm md:text-xs">{text}</p>
                <p className="font-bold text-xs sm:text-sm md:text-xs">{subText}</p>
            </div>
        </div>
    );
}

const Hero = () => {
    useEffect(() => {
        gsap.fromTo(".hero-title", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(".hero-description", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
        gsap.fromTo(".hero-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1 });
        gsap.fromTo(".hero-image", { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1, delay: 1.5 });
        gsap.fromTo(".hero-bulb", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: 2 });
        gsap.fromTo(".hero-arrow", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, delay: 2.5 });
        gsap.fromTo(".hero-card", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, delay: 3, stagger: 0.3 });
        gsap.fromTo(".hero-bubble", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: 3.5 });
    }, []);

    return (
        <div id="home" className="bg-gray-50 flex flex-col md:flex-row items-center md:justify-between justify-center w-full px-6 lg:px-20 xl:px-36 2xl:px-48 py-8 relative overflow-hidden min-h-screen md:min-h-auto">
            <div className="text-center md:text-left mb-8 md:mb-0 z-20">
                <h1 className="hero-title hidden-before-animation text-[clamp(2rem,3.5vw,4.5rem)] md:text-[clamp(2.5rem,3.2vw,5rem)] font-black text-blue-dark leading-tight">
                  Experience <br /> Excellence with Sleeky <br /> Programmers Ltd.
                </h1>
                <p className="hero-description hidden-before-animation my-6 text-sm md:text-base lg:text-lg">
                    Delivering sophisticated software solutions to <br />
                    enhance your operations and drive success. <br />
                    Let&apos;s partner to create lasting impact.
                </p>

                <div className="hero-button hidden-before-animation flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                    <div className="hero-button hidden-before-animation flex flex-col md:flex-row items-center gap-4">
                      <Button text="Get Started" onClick={() => config.handleScrollTo("contact-us")} />
                    </div>
                    <div
                        className="flex flex-row items-center justify-center md:justify-start gap-2 cursor-pointer"
                        onClick={() => config.handleScrollTo("about-us")}
                    >
                        <Image
                            src="/assets/play-icon.png"
                            alt="Learn more"
                            width={35}
                            height={35}
                        />
                        <p className="text-sm md:text-base">Learn more</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex justify-center md:justify-end w-full md:w-auto">
                <div className="relative">
                    <Image
                      src="/assets/hero-img.png"
                      alt="Hero"
                      width={800}
                      height={800}
                      className="hero-image hidden-before-animation relative z-10 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[520px] xl:w-[640px] 2xl:w-[760px] h-auto"
                    />

                    <Image
                        src="/assets/bulb.png"
                        alt="Bulb"
                        width={120}
                        height={120}
                        className="hero-bulb hidden-before-animation absolute bottom-[60px] sm:bottom-[80px] md:bottom-[120px] lg:bottom-[200px] left-[-40px] sm:left-[-30px] md:left-[-20px] z-0 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
                    />

                    <Image
                        src="/assets/arrow.png"
                        alt="Arrow"
                        width={60}
                        height={60}
                        className="hero-arrow hidden-before-animation absolute top-[20px] sm:top-[30px] md:top-[40px] lg:top-[60px] right-[10px] sm:right-[20px] md:right-[30px] lg:right-[50px] z-0 w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px]"
                    />

                    <BackgroundDataCard
                        src="/assets/analytics.png"
                        text="100%"
                        subText="Business Growth"
                        className="hero-card absolute top-[-10px] sm:top-[0px] md:top-[10px] lg:top-[30px] left-[-30px] md:left-[-40px] lg:left-[-30px] z-0"
                    />

                    <BackgroundDataCard
                        src="/assets/hand-heart.png"
                        text="10"
                        subText="Happy Clients"
                        className="hero-card absolute bottom-[20px] sm:bottom-[30px] md:bottom-[50px] lg:bottom-[90px] right-[100px] md:right-[400px] z-0"
                    />
                </div>
            </div>

            <Image
                src="/assets/hero-bubble.png"
                alt="Bubble"
                width={50}
                height={50}
                className="hero-bubble hidden-before-animation absolute right-0 top-[30px] md:top-[50px] z-0 w-[20px] sm:w-[30px] md:w-[40px] lg:w-[50px] h-[60px] sm:h-[80px] md:h-[150px] lg:h-[300px]"
            />
        </div>
    );
}

export default Hero;
