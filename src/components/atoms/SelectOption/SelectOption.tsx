interface SelectOptionProps {
    id: string;
    name: string;
    options: Record<string | number, string>;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOption = ({
    id,
    name,
    options,
    placeholder,
    onChange,
}: SelectOptionProps) => {
    const defaultValue = Object.keys(options)[0] || placeholder;
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
    };
    return (
        <select
            id={id}
            name={name}
            defaultValue={defaultValue}
            className="rounded border border-gray-300 bg-gray-25 px-3 py-1 text-text-md font-medium text-gray-900"
            aria-label={name}
            onChange={handleSelectChange}
        >
            <option
                value=""
                className="text-text-sm font-semibold text-gray-600"
            >
                {placeholder}
            </option>
            {Object.entries(options).map(([key, value]) => (
                <option
                    key={key}
                    value={key}
                    className="py-1 pl-3 text-text-md font-medium text-gray-700"
                >
                    {value}
                </option>
            ))}
        </select>
    );
};

export default SelectOption;
