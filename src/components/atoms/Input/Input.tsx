interface InputProps {
    id: string;
    label?: string;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
}
const Input = ({
    id,
    type = 'text',
    value,
    readonly,
    placeholder,
}: InputProps) => {
    return (
        <input
            className="border border-gray-300 bg-gray-25 px-2 py-1 text-text-md shadow-xs placeholder:text-gray-500"
            type={type}
            id={id}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
        />
    );
};
export default Input;
