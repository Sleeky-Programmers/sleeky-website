"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
    useEffect(() => {
        gsap.fromTo(
            ".contact-heading",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, scrollTrigger: ".contact-heading" }
        );

        gsap.fromTo('.contact-form-item', {
            opacity: 0,
            y: 30,
            ease: 'power3.out'
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: '.contact-form-item'
        });
    }, []);

    return (
        <div className="py-12">
            <div className="max-w-lg mx-auto text-center">
                <h2 className="text-3xl font-semibold contact-heading">Say hello</h2>
                <p className="mt-4 text-gray-600 contact-heading">
                    We&rsquo;re here to connect. Reach out to us through the options below, and let&rsquo;s start a conversation.
                </p>
            </div>

            <div className="mt-8 max-w-xl mx-auto">
                <form action="#" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 contact-form-item">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="contact-form-item">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                            placeholder="Email Address"
                        />
                    </div>

                    <div className="contact-form-item">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                            placeholder="Message"
                        ></textarea>
                    </div>

                    <div className="text-right contact-form-item">
                        <Button
                            text="Get in touch"
                            onClick={() => { }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
