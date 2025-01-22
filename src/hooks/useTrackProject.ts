import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getStudentsAPI } from '@/api/adminAPI';
import { StudentType } from '@/types/User';

interface DatasetType extends DOMStringMap {
  id: string;
  name: string;
}

// 관통 프로젝트 생성 훅 함수 
export const useCreateTrackProject = () => {

    const MAX_LENGTH = 210;

    // 유저 정보
    const {userInfo} = useAuth();

    // 모든 학생을 받아오는 useQuery 함수
    const {data : response} = useQuery<StudentType[]>({
      queryKey: ["track-students", userInfo?.generationId],
      queryFn: () => getStudentsAPI(Number(userInfo?.generationId))
    })

    // 프로젝트 이름
    const [title, setTitle] = useState('');
    const handleTitleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    // 프로젝트 목표
    const [objective, setObjective] = useState('');
    const handleObjectiveInput = (e:React.ChangeEvent<HTMLInputElement>) => {
      setObjective(e.target.value);
    };

    // 프로젝트 설명
    const [description, setDescription] = useState('');
    const handleDescriptionInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {

      const inputValue = e.target.value;

      if(inputValue.length > MAX_LENGTH){
        setDescription(inputValue.slice(0, MAX_LENGTH));
      }else{
        setDescription(inputValue);
      }
    };

    // 제외 인원
    const [weedingMember, setWeedingMember] = useState<Result[]>([]);
    const [search, setSearch] = useState<Result[]>([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {

      if(!response){
          return;
      }

      const processed = response.map(user => ({
        id: String(user.userId),
        name: user.name
      }));

      const filteredSearch = processed.filter(user => {
        const isInWeedingMember = weedingMember.some((member) => member.id === user.id);

        if(searchInput === ""){
          return false;
        }

        return (!isInWeedingMember && user.name.includes(searchInput));
      })

      setSearch(filteredSearch);

    }, [response, searchInput, weedingMember]);

    const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    };

    const handleSearchOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {

      const button = e.currentTarget as HTMLButtonElement & {
        dataset: DatasetType;
      };
      const memberId = button.dataset.id;
      const memberName = button.dataset.name;

      setSearchInput('');

      setWeedingMember([...weedingMember, { id: memberId, name: memberName }]);

    };

    const handleWeedingMember  = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget as HTMLButtonElement & {
        dataset: DatasetType;
      };
      const memberId = button.dataset.id;

      setWeedingMember(weedingMember.filter((item) => item.id !== memberId));
    };


    return {
      title,
      objective,
      description, 
      weedingMember, 
      search, 
      searchInput,
      handleTitleInput,
      handleObjectiveInput,
      handleDescriptionInput,
      handleSearchOnChange, 
      handleWeedingMember, 
      handleSearchOnClick
    }
}


