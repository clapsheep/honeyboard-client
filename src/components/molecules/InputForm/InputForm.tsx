import { Button, ErrorMessage, Input, Label } from '@/components/atoms';
import { forwardRef } from 'react';

interface InputFormProps {
    id: string;
    label: string;
    showLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'email' | 'number' | 'password';
    value?: string;
    readonly?: boolean;
    buttonName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    errorMessage?: string;
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
            value,
            readonly,
            buttonName,
            onChange,
            onClick,
            onKeyDown,
            errorMessage,
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
                        readonly={readonly}
                        aria-label={!showLabel && label}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
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
