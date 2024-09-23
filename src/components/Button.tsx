type ButtonProps = {
    text: string;
    onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button
            className="bg-gradient-to-r from-blue-dark to-blue-light text-white px-4 py-2 rounded-lg font-bold hover:from-white hover:to-white hover:text-blue-dark shadow-md"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;