"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import Button from "./Button";

type BackgroundDataCardProps = {
    src: string;
    text: string;
    subText: string;
    className?: string;
}

const BackgroundDataCard = ({ src, text, subText, className }: BackgroundDataCardProps) => {
    return (
        <div className={`flex items-center justify-start gap-3 bg-white shadow-2xl w-[250px] md:w-[200px] px-3 py-2 rounded-lg hidden-before-animation ${className}`}>
            <Image 
                src={src} 
                alt={text} 
                width={20} 
                height={20} 
            />
            <div>
                <p className="font-bold text-sm md:text-xs">{text}</p>
                <p className="font-bold text-sm md:text-xs">{subText}</p>
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
        <div id="home" className="bg-gray-50 flex flex-col md:flex-row flex-wrap items-center md:justify-between justify-center w-full px-4 md:px-[40px] py-2 relative overflow-hidden">
            <div className="text-center md:text-left mb-8 md:mb-0">
                <h1 className="hero-title hidden-before-animation text-3xl md:text-4xl lg:text-5xl text-blue-dark font-black leading-snug">
                    Experience <br /> Excellence with Sleeky <br /> Programmer Ltd
                </h1>
                <p className="hero-description hidden-before-animation my-5 text-sm md:text-base">
                    Delivering sophisticated software solutions to <br />
                    enhance your operations and drive success. <br />
                    Let&apos;s partner to create lasting impact.
                </p>
                
                <div className="hero-button hidden-before-animation flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                    <Button
                        text="Get Started" 
                        onClick={() => { }} 
                    />
                    <div className="flex flex-row items-center justify-center md:justify-start gap-2 cursor-pointer">
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
            <div className="relative z-10 flex justify-center md:justify-end">
                <Image
                    src="/assets/hero-img.png" 
                    alt="Hero" 
                    width={400} 
                    height={400} 
                    className="hero-image hidden-before-animation relative z-10 w-[80%] md:w-[500px] h-auto" 
                />
                <Image 
                    src="/assets/bulb.png" 
                    alt="Bulb" 
                    width={150} 
                    height={150} 
                    className="hero-bulb hidden-before-animation absolute bottom-[100px] md:bottom-[200px] left-[-20px] z-0" 
                />
                <Image 
                    src="/assets/arrow.png" 
                    alt="Arrow" 
                    width={80} 
                    height={80} 
                    className="hero-arrow hidden-before-animation absolute top-[40px] md:top-[60px] right-[50px] md:right-[70px] z-0" 
                />

                <BackgroundDataCard
                    src="/assets/analytics.png"
                    text="100%"
                    subText="Business Growth"
                    className="hero-card absolute top-[20px] left-[-20px] md:top-[30px] md:left-[-30px] z-0"
                />
                <BackgroundDataCard
                    src="/assets/hand-heart.png"
                    text="100,000"
                    subText="Happy Clients"
                    className="hero-card absolute bottom-[60px] md:bottom-[90px] right-[160px] md:right-[320px] z-0"
                />
            </div>

            <Image 
                src="/assets/hero-bubble.png" 
                alt="Bubble" 
                width={50} 
                height={50} 
                className="hero-bubble hidden-before-animation absolute right-0 top-[30px] md:top-[50px] z-0 w-[30px] md:w-[50px] h-[100px] md:h-[300px]" 
            />
        </div>
    );
}

export default Hero;
