import Icon from '../Icon/Icon';

interface InputProps {
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
    iconId?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'password';
}
const Input = ({
    id,
    type = 'text',
    value,
    onChange,
    readonly,
    iconId,
    placeholder,
}: InputProps) => {
    return (
        <div className="relative w-[26.125rem]">
            {iconId && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                    <Icon id={iconId} aria-hidden="true" />
                </div>
            )}
            <input
                className={`w-full border border-gray-300 bg-gray-25 px-2 py-1 text-text-md shadow-xs placeholder:text-gray-500 ${
                    iconId ? 'pl-8' : ''
                }`}
                type={type}
                id={id}
                onChange={onChange}
                value={value}
                readOnly={readonly}
                placeholder={placeholder}
            />
        </div>
    );
};
export default Input;
