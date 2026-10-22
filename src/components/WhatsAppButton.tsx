const WHATSAPP_URL = "https://wa.me/2349160952000";

const WhatsAppButton = () => {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            title="Chat with us on WhatsApp"
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-transform duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-8 h-8 md:w-9 md:h-9 fill-white"
                aria-hidden="true"
            >
                <path d="M16.003 3C8.832 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.64c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.36 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.64 4.77 10.64 10.64 0 5.86-4.78 10.64-10.64 10.64Zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
        </a>
    );
};

export default WhatsAppButton;
