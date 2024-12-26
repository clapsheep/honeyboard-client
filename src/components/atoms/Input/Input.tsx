import { forwardRef } from 'react';
import Icon from '../Icon/Icon';

interface InputProps {
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
    iconId?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'password';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            type = 'text',
            value,
            onChange,
            onKeyDown,
            readonly,
            iconId,
            placeholder,
        }: InputProps,
        ref,
    ) => {
        return (
            <div className="relative w-[26.125rem]">
                {iconId && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                        <Icon id={iconId} aria-hidden="true" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={`w-full border border-gray-300 bg-gray-25 px-2 py-1 text-text-md shadow-xs placeholder:text-gray-500 ${
                        iconId ? 'pl-8' : ''
                    }`}
                    type={type}
                    id={id}
                    name={id}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={value}
                    readOnly={readonly}
                    placeholder={placeholder}
                />
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
