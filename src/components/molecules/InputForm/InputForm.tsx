import { Button, ErrorMessage, Input, Label } from '@/components/atoms';
import { forwardRef } from 'react';

interface InputFormProps {
    id: string;
    label: string;
    showLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | number;
    type?: 'text' | 'email' | 'number' | 'password';
    value?: string | number;
    readonly?: boolean;
    buttonName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    disabled?: boolean;
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
    (
        {
            id,
            label,
            showLabel = true,
            placeholder,
            required = false,
            type,
            defaultValue,
            value,
            readonly,
            buttonName,
            onChange,
            onClick,
            onKeyDown,
            errorMessage,
            disabled,
        }: InputFormProps,
        ref,
    ) => {
        return (
            <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                    <div className="ml-1 flex items-start">
                        {showLabel && <Label text={label} htmlFor={id} />}
                        {required && <span className="text-error-500">*</span>}
                    </div>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        ref={ref}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        defaultValue={defaultValue}
                        readonly={readonly}
                        aria-label={!showLabel && label}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        disabled={disabled}
                    />
                    {buttonName && onClick && (
                        <Button onClick={onClick}>{buttonName}</Button>
                    )}
                </div>
            </div>
        );
    },
);

InputForm.displayName = 'InputForm';

export default InputForm;
