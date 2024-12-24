interface SelectForInputProps {
    id: string;
    name: string;
    options: Record<string | number, string>;
    selectedValue: string; // options의 value와의 구별을 위해 selectedValue로 네이밍
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForInput = ({
    id,
    name,
    options,
    selectedValue,
    onChange,
}: SelectForInputProps) => {
    return (
        <select
            id={id}
            name={name}
            value={selectedValue}
            onChange={onChange}
            aria-label={name}
            className="mr-4 gap-1 border border-gray-300 bg-white py-2 pl-3 pr-4 text-text-md text-gray-900"
        >
            {Object.entries(options).map(([key, value]) => (
                <option
                    key={key}
                    value={key}
                    className={`gap-2 py-2 pl-3 text-text-md text-gray-500 ${selectedValue === key ? 'text-gray-900' : ''}`}
                >
                    {value}
                </option>
            ))}
        </select>
    );
};

export default SelectForInput;
