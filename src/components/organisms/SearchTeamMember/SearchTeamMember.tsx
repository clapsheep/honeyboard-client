import { Button, Icon } from '@/components/atoms';
import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import { SearchBar } from '@/components/molecules';
import { useMemo } from 'react';

interface SearchTeamMemberProps {
    title: string;
    team: Result[];
    results: Result[];
    inputValue: string;
    onClickResult: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchTeamMember = ({
    title,
    team,
    results,
    inputValue,
    onClickResult,
    onClickSearch,
    onChange,
    onClick,
}: SearchTeamMemberProps) => {
    const TeamMemberButton = useMemo(() => {
        return team.map((member: Result) => (
            <Button
                key={member.id}
                data-id={member.id}
                data-name={member.name}
                onClick={onClick}
                className="flex items-center gap-1 border border-black bg-gray-25 !px-2 !text-black hover:bg-gray-200"
            >
                <span>{member.name}</span>
                <Icon id="cancle-circle" />
            </Button>
        ));
    }, [team, onClick]);

    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <section className="flex gap-3">{TeamMemberButton}</section>
            <section>
                <SearchBar
                    id={`${title} 검색`}
                    label={title}
                    placeholder="이름을 입력하세요."
                    results={results}
                    inputValue={inputValue}
                    onClickResult={onClickResult}
                    onClickSearch={onClickSearch}
                    onChange={onChange}
                />
            </section>
        </section>
    );
};

export default SearchTeamMember;
