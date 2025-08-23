"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  useEffect(() => {
    const items = gsap.utils.toArray(".client-item");

    items.forEach((item: any) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(items);
    };
  }, []);

  const clients = [
    { name: "Tyda", image: "/assets/clients/tyda.png" },
    { name: "Nexterra", image: "/assets/clients/nexterra.png" },
    { name: "Votely", image: "/assets/clients/votely.png" },
    { name: "OneFarm", image: "/assets/clients/onefarm.jpg" },
  ];

  const handleImageLoad = () => {
    ScrollTrigger.refresh();
  };

  return (
    <div id="clients" className="px-4 md:px-[40px] py-6 mb-4">
      <div className="flex items-center justify-center flex-col mb-5">
        <h2 className="text-3xl font-bold text-blue-dark mb-2 client-item">
          Our Valued Clients
        </h2>
        <div className="bg-green w-[100px] h-[4px] rounded-full client-item" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-items-center">
        {clients.map((client, index) => (
          <div key={index} className="flex items-center justify-center client-item">
            <Image
              src={client.image}
              alt={client.name}
              width={200}
              height={50}
              onLoadingComplete={handleImageLoad}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
