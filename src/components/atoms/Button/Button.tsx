interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    color?: 'red' | 'blue' | 'green' | 'gray';
    disabled?: boolean;
}

const Button = ({
    children,
    type = 'button',
    color = 'blue',
    disabled = false,
    onClick,
}: ButtonProps) => {
    const COLOR_PROS = {
        red: 'bg-error-500',
        blue: 'bg-blue-500',
        green: 'bg-success-500',
        gray: 'bg-gray-500',
    };

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`rounded-sm px-4 py-1 text-text-md font-semibold text-gray-25 ${COLOR_PROS[color]}`}
        >
            {children}
        </button>
    );
};

export default Button;
