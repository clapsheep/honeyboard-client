import { Icon } from '@/components/atoms';
import SearchDropDown, {
    Result,
} from '@/components/atoms/SearchDropDown/SearchDropDown';

interface SearchBarProps {
    id: string;
    label: string;
    inputValue?: string;
    placeholder: string;
    results: Result[];
    onClickResult: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
    id,
    label,
    inputValue,
    placeholder,
    results,
    onClickResult,
    onClickSearch,
    onChange,
    onKeyDown,
}: SearchBarProps) => {
    return (
        <section className="flex flex-col bg-gray-25">
            <section className="flex w-full items-center gap-3 border border-gray-300 px-3">
                <Icon id="search" size={24} />
                <section className="w-full">
                    <label htmlFor={id} className="hidden">
                        {label}
                    </label>
                    <input
                        type="text"
                        id={id}
                        value={inputValue}
                        placeholder={placeholder}
                        className="bg-transparent px-0 py-2 focus:outline-none"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                </section>
                {onClickSearch ? (
                    <button
                        onClick={onClickSearch}
                        className="bg-blue-600 p-2 hover:bg-blue-900"
                    >
                        <Icon id="button-search" size={24} />
                    </button>
                ) : null}
            </section>
            {results.length > 0 ? (
                <section className="mt-1">
                    <SearchDropDown results={results} onClick={onClickResult} />
                </section>
            ) : null}
        </section>
    );
};

export default SearchBar;
