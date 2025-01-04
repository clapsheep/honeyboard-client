import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { Header } from '@/components/organisms';
import SearchTeamMember from '@/components/organisms/SearchTeamMember/SearchTeamMember';
import useAlgorithmTag from '@/hooks/useAlgorithmTag';
import { useAuth } from '@/hooks/useAuth';
import { updateAlgorithmProblemAPI } from '@/services/study/algorithm';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const UpdateAlgorithmProblem = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    // const [detail, setDetail] = useState<AlgorithmSolution>();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {data} = await getAlgorithmProblemsAPI
    //     }
    // })

    const {
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        value,
        algoSearch,
        searchResult,
    } = useAlgorithmTag({
        initialAlgoSearch: [],
    });

    const handleCancel = () => {
        navigate(-1);
    };

    const handleUpdate = async () => {
        if (!userId) {
            alert('사용자 정보가 없습니다.');
            return;
        }

        try {
            const currentDate = new Date().toISOString();

            await updateAlgorithmProblemAPI('1', {
                id: '',
                title,
                url,
                userId,
                createdAt: currentDate,
                updatedAt: currentDate,
                deleted: false,
                tags: algoSearch,
            });

            navigate('/study/algorithm/problem');
        } catch (error) {
            console.error('문제 생성을 실패했습니다.', error);
        }
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const onDelete = () => {
        console.log('삭제');
    };

    return (
        <>
            <Header
                titleProps={{ title: '문제 생성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleUpdate}>문제 생성</Button>
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
                    onChange={onTitleChange}
                ></InputForm>
                <InputForm
                    id="AlgorithmProblemUrl"
                    label="문제 주소"
                    required={true}
                    placeholder="문제 주소를 입력하세요."
                    type="text"
                    value={url}
                    errorMessage={!url ? '이미 존재하는 주소입니다.' : ''}
                    onChange={onUrlChange}
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

export default UpdateAlgorithmProblem;
