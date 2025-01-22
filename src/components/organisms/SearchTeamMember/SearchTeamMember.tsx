import { Button, Icon } from '@/components/atoms';
import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import { SearchBar } from '@/components/molecules';
import { TagResponse } from '@/types/Tag';
import { useMemo } from 'react';

interface SearchTeamMemberProps {
    title: string;
    team: Result[] | TagResponse[];
    results: Result[];
    inputValue: string;
    onClickResult: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// team의 타입을 확인
const isResultArray = (team: Result[] | TagResponse[]): team is Result[] => {
    return (
        team.length === 0 ||
        (typeof team[0] === 'object' && team[0] !== null && 'id' in team[0])
    );
};

const SearchTeamMember = ({
    title,
    team,
    results,
    inputValue,
    onClickResult,
    onClickSearch,
    onChange,
    onClick,
    onKeyDown,
}: SearchTeamMemberProps) => {
    const renderTeamButtons = useMemo(() => {
        if (isResultArray(team)) {
            // team의 타입이 Result[]일 때(프로젝트 팀원 관리)
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
        } else {
            // team의 타입이 string[]일 떄(알고리즘 태그 관리)
            return (team as TagResponse[]).map(
                (tag: TagResponse, index: number) => (
                    <Button
                        key={index}
                        data-name={tag.name}
                        onClick={onClick}
                        className="flex items-center gap-1 border border-black bg-gray-25 !px-2 !text-black hover:bg-gray-200"
                    >
                        <span>{tag.name}</span>
                        <Icon id="cancle-circle" />
                    </Button>
                ),
            );
        }
    }, [team, onClick]);

    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <section className="flex gap-3">{renderTeamButtons}</section>
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
                    onKeyDown={onKeyDown}
                />
            </section>
        </section>
    );
};

export default SearchTeamMember;
