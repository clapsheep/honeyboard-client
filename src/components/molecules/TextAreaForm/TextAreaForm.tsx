interface TextAreaFormProps {
    id: string;
    label: string;
    placeholder: string;
    height?: string;
    textValue: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
}

const TextAreaForm = ({
    id,
    label,
    placeholder,
    height = '5.375rem',
    textValue,
    maxLength,
    onChange,
}: TextAreaFormProps) => {
    return (
        <div className="relative flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
                <div className="ml-1 flex items-start">
                    <label
                        className="text-text-lg font-semibold text-gray-900"
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <textarea
                    id={id}
                    className={`h-[${height}] w-full resize-none border border-gray-300 px-2 py-2 text-text-md shadow-xs placeholder:text-gray-500`}
                    placeholder={placeholder}
                    value={textValue}
                    maxLength={maxLength}
                    onChange={onChange}
                />
            </div>
            {maxLength ? (
                <div className="absolute bottom-2 right-3 flex">
                    <span>{textValue.length}</span>
                    <span>/</span>
                    <span>{maxLength}</span>
                </div>
            ) : null}
        </div>
    );
};

export default TextAreaForm;
