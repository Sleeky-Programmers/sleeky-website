"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CoreValues = () => {
    useEffect(() => {
        gsap.fromTo(
            ".core-value-item",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".core-value-item",
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div className="px-4 md:px-[40px] py-2 mt-[30px]">
            <div className="flex flex-col items-center justify-center about-item">
                <h1 className="font-bold text-3xl md:text-4xl mb-3 text-blue-dark">Core Values</h1>
                <div className="bg-green w-[100px] h-[4px] rounded-full" />
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg mt-4">
                <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className='core-value-item flex items-center justify-start gap-3 flex-1'>
                        <div className="bg-purple-veryLight flex items-center justify-center p-4 px-5 rounded-lg">
                            <Image
                                src="/assets/excellence.png"
                                alt="Excellence"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className='flex flex-col items-start justify-center gap-2'>
                            <h1 className="font-bold text-xl">Excellence</h1>
                            <p>Commitment to delivering the highest quality in every aspect of the development process.</p>
                        </div>
                    </div>

                    <div className='core-value-item flex items-center justify-start gap-3 flex-1'>
                        <div className="bg-red-veryLight flex items-center justify-center p-4 px-5 rounded-lg">
                            <Image
                                src="/assets/integrity.png"
                                alt="Integrity"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className='flex flex-col items-start justify-center gap-2'>
                            <h1 className="font-bold text-xl">Integrity</h1>
                            <p>Upholding honesty and strong moral principles in all business and development practices.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around gap-6 mt-6">
                    <div className='core-value-item flex items-center justify-start gap-3 flex-1'>
                        <div className="bg-blue-veryLight flex items-center justify-center p-4 px-5 rounded-lg">
                            <Image
                                src="/assets/value.png"
                                alt="Value"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className='flex flex-col items-start justify-center gap-2'>
                            <h1 className="font-bold text-xl">Value</h1>
                            <p>Focusing on creating products that provide significant value to users and clients.</p>
                        </div>
                    </div>

                    <div className='core-value-item flex items-center justify-start gap-3 flex-1'>
                        <div className="bg-lilac-veryLight flex items-center justify-center p-4 px-5 rounded-lg">
                            <Image
                                src="/assets/leadership.png"
                                alt="Leadership"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className='flex flex-col items-start justify-center gap-2'>
                            <h1 className="font-bold text-xl">Leadership</h1>
                            <p>Leading by example in the industry by innovating and setting trends in software development.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoreValues;
