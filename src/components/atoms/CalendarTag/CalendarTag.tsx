interface CalendarTagProps {
    children: React.ReactNode;
    color?: 'blue' | 'orange' | 'red' | 'green' | 'regular';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    readOnly?: boolean;
}

const CalendarTag = ({
    children,
    color = 'regular',
    onClick,
    readOnly,
}: CalendarTagProps) => {
    const COLOR_PROPS = {
        blue: 'text-blue-700 bg-blue-100',
        orange: 'text-orange-400 bg-orange-50',
        red: 'text-error-500 bg-error-100',
        green: 'text-success-600 bg-success-50',
        regular: 'text-gray-600 bg-gray-200',
    };

    return (
        <button
            onClick={onClick}
            className={`rounded px-2 py-1 text-text-sm font-medium ${COLOR_PROPS[color]} ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        >
            {children}
        </button>
    );
};

export default CalendarTag;
