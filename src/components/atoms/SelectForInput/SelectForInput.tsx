import { useState } from 'react';

interface SelectForInputProps {
    id: string;
    name: string;
    options: Record<string | number, string>;
    placeholder: string;
}

const SelectForInput = ({
    id,
    name,
    options,
    placeholder,
}: SelectForInputProps) => {
    const [selectedOption, setSelectedOption] = useState<string>(
        Object.keys(options)[0] || placeholder,
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <select
            id={id}
            name={name}
            value={selectedOption}
            onChange={handleChange}
            aria-label={name}
            className="mr-4 gap-1 border border-gray-300 bg-white py-2 pl-3 pr-4 text-text-md text-gray-900"
        >
            {Object.entries(options).map(([key, value]) => (
                <option
                    key={key}
                    value={key}
                    className={`gap-2 py-2 pl-3 text-text-md text-gray-500 ${selectedOption === key ? 'text-gray-900' : ''}`}
                >
                    {value}
                </option>
            ))}
        </select>
    );
};

export default SelectForInput;
