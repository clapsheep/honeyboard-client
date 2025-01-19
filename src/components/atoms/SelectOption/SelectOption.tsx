interface SelectOptionProps {
    id: string;
    name: string;
    options: { value: string | number; label: string }[];
    placeholder: string;
    placeholderDisabled?: boolean;
    value: string | number | null; // defaultValue에서 value로 변경
    disableBorder?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOption = ({
    id,
    name,
    options,
    placeholder,
    placeholderDisabled,
    disableBorder = false,
    value, // value로 props 변경

    onChange,
}: SelectOptionProps) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
    };
    return (
        <select
            id={id}
            name={name}
            value={value ?? ''} // value로 바인딩
            className={`rounded bg-gray-25 px-3 py-1 text-text-md font-medium text-gray-900 ${
                disableBorder ? 'border-none' : 'border border-gray-300'
            }`}
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
