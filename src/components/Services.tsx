"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceItemProps = {
    img: string;
    topInfo: string;
    icon: string;
    topTitle: string;
    bottomTitle: string;
    content: string;
    alternate: boolean;
}

const ServiceItem = ({ img, topInfo, icon, topTitle, bottomTitle, content, alternate }: ServiceItemProps) => {
    const serviceItemRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceItemRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });

            timeline
                .fromTo(
                    ".service-item-top",
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                )
                .fromTo(
                    ".service-item-bottom",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
                    "-=0.8"
                )
                .fromTo(
                    ".service-item-image",
                    { opacity: 0, x: alternate ? 150 : -150 },
                    { opacity: 1, x: 0, duration: 1, stagger: 0.2 },
                    "-=0.8"
                );
        }, serviceItemRef);

        return () => ctx.revert();
    }, [alternate]);

    if (alternate) {
        return (
            <div ref={serviceItemRef} className="flex items-center justify-between gap-3 flex-wrap-reverse">
                <Image
                    src={img}
                    alt={`${topTitle} ${bottomTitle}`}
                    width={450}
                    height={450}
                    className="flex-1 service-item-image"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-start gap-2 mb-3 service-item-top">
                        <div className="flex items-center justify-center bg-green rounded-full p-3">
                            <Image
                                src={icon}
                                alt={`${topTitle} ${bottomTitle}`}
                                width={20}
                                height={20}
                            />
                        </div>
                        <p className="font-bold text-sm text-blue-dark">{topInfo}</p>
                    </div>
                    <div>
                        <div className="flex flex-col items-start justify-center mb-2 service-item-top">
                            <h1 className="font-black text-4xl text-green">{topTitle}</h1>
                            <h1 className="font-black text-4xl text-blue-dark">{bottomTitle}</h1>
                        </div>
                        <p className="service-item-bottom">{content}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={serviceItemRef} className="flex items-center justify-between gap-3 flex-wrap mt-[20px]">
            <div className="flex-1">
                <div className="flex items-center justify-start gap-2 mb-3 service-item-top">
                    <div className="flex items-center justify-center bg-blue-dark rounded-full p-3">
                        <Image
                            src={icon}
                            alt={`${topTitle} ${bottomTitle}`}
                            width={20}
                            height={20}
                        />
                    </div>
                    <p className="font-bold text-sm text-blue-dark">{topInfo}</p>
                </div>
                <div>
                    <div className="flex flex-col items-start justify-center mb-2 service-item-top">
                        <h1 className="font-black text-4xl text-blue-dark">{topTitle}</h1>
                        <h1 className="font-black text-4xl text-green">{bottomTitle}</h1>
                    </div>
                    <p className="service-item-bottom">{content}</p>
                </div>
            </div>
            <Image
                src={img}
                alt={`${topTitle} ${bottomTitle}`}
                width={450}
                height={450}
                className="flex-1 service-item-image"
            />
        </div>
    );
}

const Services = () => {
    return (
        <div id="services" className="px-4 md:px-[40px] py-6">
            <div className="flex flex-col items-center text-center">
                <Image
                    src="/assets/megaphone.png"
                    alt="Our Services"
                    width={60}
                    height={60}
                    className="mb-4 service-icon"
                />
                <div className="flex items-center justify-center flex-col mb-5">
                    <h2 className="text-3xl font-bold text-blue-dark mb-2 service-title">Our Services</h2>
                    <div className="bg-green w-[100px] h-[4px] rounded-full service-border" />
                </div>
                <p className="text-lg max-w-[600px] text-gray-600 service-text">
                    Sleeky Programmers Ltd. offers a wide range of services designed to meet diverse client needs:
                </p>
            </div>

            <div>
                <ServiceItem
                    img="/assets/mobile-app.png"
                    topInfo="We create user-friendly, high-performance mobile apps for multiple platforms."
                    icon="/assets/mobile-app-icon.png"
                    topTitle="Mobile App"
                    bottomTitle="Development"
                    content="Sleeky Programmers excels in crafting intuitive, high-performance mobile applications that deliver exceptional user experiences across various platforms. Our solutions ensure seamless integration and superior functionality, tailored to meet each user's unique needs."
                    alternate={false}
                />
                <ServiceItem
                    img="/assets/web-dev.png"
                    topInfo="We build responsive, engaging websites and scalable, tailored web apps."
                    icon="/assets/web-dev-icon.png"
                    topTitle="Website"
                    bottomTitle="Development"
                    content="At Sleeky Programmers, we specialize in creating aesthetically pleasing, highly responsive, and fully functional websites designed to drive user engagement and enhance online presence. Our web development services extend to building robust, scalable web applications meticulously tailored to meet specific business needs, ensuring optimal performance and seamless user experiences."
                    alternate={true}
                />
                <ServiceItem
                    img="/assets/web-app-dev.png"
                    topInfo="We craft scalable web applications tailored to your business."
                    icon="/assets/web-dev-icon.png"
                    topTitle="Web App"
                    bottomTitle="Development"
                    content="Expertly crafting highly scalable and robust web applications, meticulously tailored to meet your business's unique needs. Our solutions ensure seamless performance, enhanced security, future-ready adaptability, and a user-centric experience that drives growth and innovation."
                    alternate={false}
                />
                <ServiceItem
                    img="/assets/system-automation.png"
                    topInfo="Enhancing efficiency with advanced automation solutions."
                    icon="/assets/system-automation-icon.png"
                    topTitle="System"
                    bottomTitle="Automation"
                    content="Transforming business operations by implementing state-of-the-art automation solutions that streamline complex processes, enhance productivity, and drive unparalleled efficiency across all levels of your organization."
                    alternate={true}
                />
                <ServiceItem
                    img="/assets/branding.png"
                    topInfo="Offering complete branding services to build and sustain a strong market presence."
                    icon="/assets/branding-icon.png"
                    topTitle="Branding"
                    bottomTitle=""
                    content="Offering a full spectrum of branding services aimed at helping businesses craft, solidify, and perpetuate a compelling market identity. We focus on creating cohesive brand experiences that captivate audiences, foster brand loyalty, and ensure a lasting and influential presence in the marketplace."
                    alternate={false}
                />
            </div>
        </div>
    );
};

export default Services;
