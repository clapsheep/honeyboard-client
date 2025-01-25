import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getStudentsAPI } from '@/api/adminAPI';
import { AvailableUserListResponse, StudentType } from '@/types/User';
import { useParams } from 'react-router';
import { getTrackProjectAvailableUserAPI } from '@/api/trackAPI';

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

// 관통 팀 생성 커스텀 훅 함수
export const useCreateTrackTeam = () => {
  // 유저 정보
  const { userInfo } = useAuth();
  const { trackProjectId } = useParams();

  // 팀원이 정해지지 않은 유저를 받아오는 useQuery 함수
  const { data: response } = useQuery<AvailableUserListResponse, Error>({
    queryKey: ['remained-users', userInfo?.generationId],
    queryFn: () => getTrackProjectAvailableUserAPI({ trackProjectId: trackProjectId! }),
    enabled: !!trackProjectId && !!userInfo?.generationId,
});

  // 팀장 관리에 대한 상태
  const [teamLeader, setTeamLeader] = useState<Result[]>([]);
  const [leaderInputValue, setLeaderInputValue] = useState<string>('');
  const [leaderSearch, setLeaderSearch] = useState<Result[]>([]);

  // 팀원 관리에 대한 상태
  const [teamMember, setTeamMember] = useState<Result[]>([]);
  const [memberInputValue, setMemberInputValue] = useState<string>('');
  const [memberSearch, setMemberSearch] = useState<Result[]>([]);

  const [contain, setContain] = useState<boolean>(false);

  useEffect(() => {

    setContain(false);

    teamLeader.forEach(item => {
      if(userInfo?.userId == item.id){
        setContain(true);
      }
    })

    teamMember.forEach(item => {
      if(userInfo?.userId == item.id){
        setContain(true);
      }
    })

  },[teamLeader, teamMember, userInfo])


  // TeamLeader에 대한 검색어 관련 useEffect
  useEffect(() => {
      if (!response) {
          return;
      }

      const processed = response.map((user) => ({
          id: user.id,
          name: user.name,
      }));

      const filteredSearch = processed.filter((user) => {
          const isInTeamLeader = teamLeader.some(
              (leader) => leader.id === user.id,
          );
          const isInTeamMember = teamMember.some(
              (member) => member.id === user.id,
          );

          if (leaderInputValue === '') {
              return false;
          }

          return (
              !isInTeamLeader &&
              !isInTeamMember &&
              user.name.includes(leaderInputValue)
          );
      });

      setLeaderSearch(filteredSearch);
  }, [response, leaderInputValue, teamLeader, teamMember]);

  // TeamLeader에 대한 검색어 관련 useEffect
  useEffect(() => {
      if (!response) {
          return;
      }

      const processed = response.map((user) => ({
          id: user.id,
          name: user.name,
      }));

      const filteredSearch = processed.filter((user) => {
          const isInTeamLeader = teamLeader.some(
              (leader) => leader.id === user.id,
          );
          const isInTeamMember = teamMember.some(
              (member) => member.id === user.id,
          );

          if (memberInputValue === '') {
              return false;
          }

          return (
              !isInTeamLeader &&
              !isInTeamMember &&
              user.name.includes(memberInputValue)
          );
      });

      setMemberSearch(filteredSearch);
  }, [response, memberInputValue, teamLeader, teamMember]);

  // 팀장 검색창의 onChange 함수
  const handleLeaderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLeaderInputValue(e.target.value);
  };

  // 검색창에서 인원을 선택하는 click 함수
  const handleLeaderSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget as HTMLButtonElement & {
          dataset: DatasetType;
      };
      const memberId = button.dataset.id;
      const memberName = button.dataset.name;

      setLeaderInputValue('');

      setTeamLeader([{ id: memberId, name: memberName }]);
  };

  // 선택한 팀장에서 제외시키는 click 함수
  const handleTeamLeader = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget as HTMLButtonElement & {
          dataset: DatasetType;
      };
      const memberId = button.dataset.id;
      
      setTeamLeader(teamLeader.filter((item) => item.id != memberId));
      
  };

  // 팀원 검색창의 onChange 함수
  const handleMemberOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMemberInputValue(e.target.value);
  };

  // 팀원 관리에 대한 이벤트 함수
  const handleTeamMember = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const memberId = button.dataset.id;

      setTeamMember(teamMember.filter((item) => item.id != memberId));
  };

  // 검색창에서 인원을 선택하는 click 함수
  const handleMemberSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget as HTMLButtonElement & {
          dataset: DatasetType;
      };
      const memberId = button.dataset.id;
      const memberName = button.dataset.name;

      setMemberInputValue('');

      setTeamMember([...teamMember, { id: memberId, name: memberName }]);
  };
  return {
      contain,
      teamLeader,
      setTeamLeader,
      leaderInputValue,
      leaderSearch,
      handleTeamLeader,
      handleLeaderSearch,
      handleLeaderOnChange,
      teamMember,
      setTeamMember,
      memberInputValue,
      memberSearch,
      handleTeamMember,
      handleMemberSearch,
      handleMemberOnChange,
  };
};
