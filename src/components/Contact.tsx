"use client";

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { config } from '@/config';
import ErrorOrSuccessMessageBox from './ErrorOrSuccessMessageBox';

gsap.registerPlugin(ScrollTrigger);

declare global {
    interface Window {
        grecaptcha?: any;
        onRecaptchaLoad?: () => void;
    }
}

const RECAPTCHA_SCRIPT_ID = 'recaptcha-script';

const ContactForm = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [captchaToken, setCaptchaToken] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const captchaRef = useRef<HTMLDivElement>(null);
    const captchaWidgetId = useRef<number | null>(null);

    useEffect(() => {
        const renderCaptcha = () => {
            if (!captchaRef.current || captchaWidgetId.current !== null) return;

            captchaWidgetId.current = window.grecaptcha.render(captchaRef.current, {
                sitekey: config.RECAPTCHA_SITE_KEY,
                callback: (token: string) => {
                    setCaptchaToken(token);
                    setErrorMessage('');
                },
                'expired-callback': () => setCaptchaToken(""),
            });
        };

        if (window.grecaptcha?.render) {
            renderCaptcha();
            return;
        }

        window.onRecaptchaLoad = renderCaptcha;

        if (!document.getElementById(RECAPTCHA_SCRIPT_ID)) {
            const script = document.createElement('script');
            script.id = RECAPTCHA_SCRIPT_ID;
            script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    const resetCaptcha = () => {
        if (window.grecaptcha && captchaWidgetId.current !== null) {
            window.grecaptcha.reset(captchaWidgetId.current);
        }
        setCaptchaToken("");
    }

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            setErrorMessage("Please complete the captcha");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${config.BASE_API_URL}/email`, { firstName, lastName, email, phone, message, captchaToken });

            setSuccessMessage(response.data.message);

            setTimeout(() => {
                setSuccessMessage("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
            }, 3000);
        } catch (error: any) {
            if (Array.isArray(error.response?.data?.message)) {
                setErrorMessage(error.response.data.message[0]);

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } finally {
            setLoading(false);
            resetCaptcha();
        }
    }

    return (
        <div className="px-6 lg:px-20 xl:px-36 2xl:px-48 py-12" id="contact-us">
          <div className="max-w-2xl lg:max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold contact-heading">Say hello</h2>
                <p className="mt-4 text-gray-600 contact-heading">
                    We&rsquo;re here to connect. Reach out to us through the options below, and let&rsquo;s start a conversation.
                </p>
            </div>

            <div className="mt-8 max-w-xl mx-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {errorMessage && <ErrorOrSuccessMessageBox
                        messageType='error'
                        message={errorMessage}
                    />}

                    {successMessage && <ErrorOrSuccessMessageBox
                        messageType='success'
                        message={successMessage}
                    />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 contact-form-item">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFirstName(e.target.value);
                                    setErrorMessage('');
                                    setSuccessMessage('');
                                }}
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
                                required
                                value={lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setLastName(e.target.value);
                                    setErrorMessage('');
                                    setSuccessMessage('');
                                }}
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
                            required
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                                setErrorMessage('');
                                setSuccessMessage('');
                            }}
                        />
                    </div>

                    <div className="contact-form-item">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="mt-1 block w-full rounded-md border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
                            placeholder="Phone Number"
                            required
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPhone(e.target.value);
                                setErrorMessage('');
                                setSuccessMessage('');
                            }}
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
                            required
                            value={message}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setMessage(e.target.value);
                                setErrorMessage('');
                                setSuccessMessage('');
                            }}
                        ></textarea>
                    </div>

                    <div className="contact-form-item">
                        <div ref={captchaRef}></div>
                    </div>

                    <div className="text-right contact-form-item">
                        <Button
                            text={loading ? "Loading..." : "Get in touch"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
