interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    color?: 'red' | 'blue' | 'green' | 'gray';
    disabled?: boolean;
    className?: string;
    'data-id'?: string;
    'data-name'?: string;
}

const Button = ({
    children,
    type = 'button',
    color = 'blue',
    disabled = false,
    onClick,
    className,
    'data-id': dataId,
    'data-name': dataName,
}: ButtonProps) => {
    const COLOR_PROS = {
        red: 'bg-error-600',
        blue: 'bg-blue-700',
        green: 'bg-success-500',
        gray: 'bg-gray-300',
    };

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            data-id={dataId}
            data-name={dataName}
            className={`rounded-sm px-4 py-1 text-text-md font-semibold text-gray-25 ${COLOR_PROS[color]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
