interface SelectOptionProps {
    id: string;
    name: string;
    options: { value: string | number; label: string }[];
    placeholder: string;
    placeholderDisabled?: boolean;
    defaultValue: string | number | null;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOption = ({
    id,
    name,
    options,
    placeholder,
    placeholderDisabled,
    defaultValue,
    onChange,
}: SelectOptionProps) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
    };
    return (
        <select
            id={id}
            name={name}
            defaultValue={defaultValue ?? ''}
            className="rounded border border-gray-300 bg-gray-25 px-3 py-1 text-text-md font-medium text-gray-900"
            aria-label={name}
            onChange={handleSelectChange}
        >
            <option
                disabled={placeholderDisabled}
                value=""
                className="text-text-sm font-semibold text-gray-600"
            >
                {placeholder}
            </option>
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                    className="py-1 pl-3 text-text-md font-medium text-gray-700"
                >
                    {label}
                </option>
            ))}
        </select>
    );
};

export default SelectOption;
