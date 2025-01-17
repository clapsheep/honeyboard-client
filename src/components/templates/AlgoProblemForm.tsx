import { Button } from '../atoms';
import { InputForm } from '../molecules';
import { Header } from '../organisms';
import SearchTeamMember from '../organisms/SearchTeamMember/SearchTeamMember';
import React from 'react';
import { TagRequest, TagResponse } from '@/types/Tag';

interface AlgoProblemFormProps {
    mode: 'create' | 'edit';
    pathname: string;
    title: string;
    url: string;
    handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAlgorithmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickResult: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
    value: string;
    algoSearch: TagRequest[];
    searchResult: TagResponse[];
}

const AlgoProblemForm = ({
    mode,
    pathname,
    title,
    url,
    handleCancel,
    handleSubmit,
    handleTitleChange,
    handleUrlChange,
    onAlgorithmChange,
    onClickResult,
    onKeyDown,
    onDelete,
    value,
    algoSearch,
    searchResult,
}: AlgoProblemFormProps) => {
    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '문제 생성' : '문제 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleSubmit}>
                            {mode === 'create' ? '문제 생성' : '문제 수정'}
                        </Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-col gap-3 px-52 pt-12">
                <InputForm
                    id="AlgorithmProblemTItle"
                    label="문제 이름"
                    required={true}
                    placeholder="문제 이름을 입력하세요."
                    type="text"
                    value={title}
                    errorMessage={!title ? '문제 이름을 입력하세요.' : ''}
                    onChange={handleTitleChange}
                ></InputForm>
                <InputForm
                    id="AlgorithmProblemUrl"
                    label="문제 주소"
                    required={true}
                    placeholder="문제 주소를 입력하세요."
                    type="text"
                    value={url}
                    errorMessage={!url ? '이미 존재하는 주소입니다.' : ''}
                    onChange={handleUrlChange}
                ></InputForm>
                <SearchTeamMember
                    title="알고리즘 분류"
                    inputValue={value}
                    team={algoSearch}
                    results={searchResult}
                    onChange={onAlgorithmChange}
                    onClick={onDelete}
                    onClickResult={onClickResult}
                    onKeyDown={onKeyDown}
                ></SearchTeamMember>
            </div>
        </>
    );
};

export default AlgoProblemForm;
