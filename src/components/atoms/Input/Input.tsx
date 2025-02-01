import { forwardRef } from 'react';
import Icon from '../Icon/Icon';

interface InputProps {
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    value?: string | number;
    defaultValue?: string | number;
    readonly?: boolean;
    placeholder?: string;
    iconId?: string;
    disabled?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'password';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            type = 'text',
            value,
            defaultValue,
            onChange,
            onKeyDown,
            readonly,
            iconId,
            placeholder,
            disabled,
        }: InputProps,
        ref,
    ) => {
        return (
            <div className="relative w-full">
                {iconId && (
                    <section className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">
                        <Icon id={iconId} size={20} aria-hidden="true" />
                    </section>
                )}

                <input
                    ref={ref}
                    className={`h-10 w-full border border-gray-300 px-2 py-1 text-text-md shadow-xs placeholder:text-gray-500 ${
                        iconId ? 'pl-8' : ''
                    } ${
                        readonly
                            ? 'cursor-not-allowed bg-gray-200 opacity-55'
                            : 'bg-gray-25'
                    }`}
                    type={type}
                    id={id}
                    name={id}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={value}
                    defaultValue={defaultValue}
                    readOnly={readonly}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
