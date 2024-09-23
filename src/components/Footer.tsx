import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-100 px-4 md:px-[40px] py-8">
            <div className="flex flex-col md:flex-row md:items-center items-start justify-between gap-3">
                <div className="flex flex-col items-start mb-8 md:mb-0 flex-1">
                    <Image
                        src="/assets/logo.png"
                        alt="Sleeky Programmers Ltd"
                        width={150}
                        height={50}
                    />
                    <p className="text-gray-700 mt-4">
                        Pioneering advanced software solutions to transform your vision into reality.
                    </p>
                </div>

                <div className="flex flex-col items-start mb-8 md:mb-0 flex-1">
                    <h2 className="font-bold text-lg text-gray-800">Quick Links</h2>
                    <ul className="mt-4">
                        <li className="mb-2">
                            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-gray-700 hover:text-blue-600">About us</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-start flex-1">
                    <h2 className="font-bold text-lg text-gray-800">Contact us</h2>
                    <p className="mt-4 text-gray-700">
                        Address: 4C, Drive 4, Prince and Princess Estate,
                        <br />
                        Kaura District, Abuja.
                    </p>
                    <p className="mt-2 text-gray-700">
                        Email: <a href="mailto:support@sleekyprogrammers.com" className="text-blue-600">support@sleekyprogrammers.com</a>
                    </p>
                    <div className="flex mt-4 space-x-4">
                        <Link href="https://www.facebook.com/profile.php?id=61565977402117&mibextid=ZbWKwL">
                            <Image
                                src="/assets/facebook.png"
                                alt="Facebook"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href="https://www.instagram.com/sleekyprogrammers?igsh=c2x4cTU1eGY5aGdj">
                            <Image
                                src="/assets/instagram.png"
                                alt="Instagram"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href="https://x.com/sleekydevs?s=09">
                            <Image
                                src="/assets/twitter.png"
                                alt="Twitter"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/company/sleeky-programmers-limited/">
                            <Image
                                src="/assets/linkedin.png"
                                alt="LinkedIn"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 text-center text-gray-600">
                <hr className="my-4" />
                <p>Copyright &copy; {new Date().getFullYear()} Sleeky Programmers. All rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
