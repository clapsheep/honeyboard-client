interface SearchDropDownProps {
    results: result[];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchDropDown = ({ results, onClick }: SearchDropDownProps) => {
    return (
        <section className="flex-col items-start gap-1 self-stretch rounded-sm border border-gray-300 bg-gray-50 p-2 shadow-md shadow-gray-300">
            {results.map((result) => (
                <button
                    key={result.id}
                    onClick={onClick}
                    className="flex w-full items-center gap-1 px-3 py-1 text-text-md text-gray-700"
                >
                    {result.name}
                </button>
            ))}
        </section>
    );
};

export default SearchDropDown;
