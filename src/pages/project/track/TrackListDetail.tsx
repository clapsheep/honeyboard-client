import { Button, NameTag, SelectOption } from '@/components/atoms';
import { TabNavigation, TeamTag } from '@/components/molecules';
import { Header, ProjectCard } from '@/components/organisms';
import { useGenerationStore } from '@/stores/generationStore';
import { useUserStore } from '@/stores/userStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackListDetail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo } = useUserStore();
    const { generationList } = useGenerationStore();
    const [generation, setGeneration] = useState<string>(
        userInfo?.generationId ?? '',
    );
    const ROUTES = [{ path: '/track', name: '프로젝트', isActive: true }];

    const GENERATION_OPTIONS = [
        { value: '13', label: '13기' },
        { value: '12', label: '12기' },
        { value: '11', label: '11기' },
    ];
    const ProjectList = [
        {
            title: '무슨무슨 서비스',
            subTitle: '프로젝트 한줄소개',
            id: '1',
            teams: ['박수양', '지유림', '서주원'],
        },
        {
            title: '무슨무슨 서비스2',
            subTitle: '프로젝트 한줄소개2',
            id: '2',
            teams: ['강지은', '강수진', '김종명'],
        },
        {
            title: '무슨무슨 서비스3',
            subTitle: '프로젝트 한줄소개3',
            id: '3',
            teams: ['김유정', '윤이영', '정예영'],
        },
        {
            title: '무슨무슨 서비스4',
            subTitle: '프로젝트 한줄소개4',
            id: '4',
            teams: ['박성문', '한재서', '홍길동'],
        },
        {
            title: '무슨무슨 서비스4',
            subTitle: '프로젝트 한줄소개4',
            id: '5',
            teams: ['김성문', '이재서', '용길동'],
        },
    ];

    const TeamList = [
        [
            { id: 1, name: '박성문', role: 'leader' as const },
            { id: 2, name: '김성문', role: 'member' as const },
            { id: 3, name: '이성문', role: 'member' as const },
        ],
        [
            { id: 4, name: '윤성문', role: 'leader' as const },
            { id: 5, name: '강성문', role: 'member' as const },
            { id: 6, name: '한성문', role: 'member' as const },
        ],
        [
            { id: 4, name: '윤성문', role: 'leader' as const },
            { id: 5, name: '강성문', role: 'member' as const },
            { id: 6, name: '한성문', role: 'member' as const },
        ],
        [
            { id: 4, name: '윤성문', role: 'leader' as const },
            { id: 5, name: '강성문', role: 'member' as const },
            { id: 6, name: '한성문', role: 'member' as const },
        ],
        [
            { id: 4, name: '윤성문', role: 'leader' as const },
            { id: 5, name: '강성문', role: 'member' as const },
            { id: 6, name: '한성문', role: 'member' as const },
        ],
        [
            { id: 4, name: '윤성문', role: 'leader' as const },
            { id: 5, name: '강성문', role: 'member' as const },
            { id: 6, name: '한성문', role: 'member' as const },
        ],
    ];
    const RemainUser = [
        { id: 1, name: '정성문' },
        { id: 2, name: '오성문' },
    ];

    return (
        <div>
            <Header
                titleProps={{
                    title: '관통 프로젝트',
                    subTitle: {
                        '프로젝트 목표': 'Vue 웹개발',
                    },
                    description: {
                        '프로젝트 설명':
                            'Vue를 활용해 사용자 친화적인 인터페이스를 구현하도록 합니다',
                    },
                }}
                BreadcrumbProps={{ pathname }}
            >
                <section className="flex justify-end gap-4">
                    <Button color="red">{'프로젝트 삭제'}</Button>
                    <Button color="blue">{'프로젝트 수정'}</Button>
                    <Button color="blue">{'일지 작성'}</Button>
                </section>
            </Header>
            <section className="m-4 mt-6 border bg-white p-4">
                <div className="pb-2 text-xl font-semibold">제출 현황</div>
                <section className="flex flex-wrap gap-2">
                    {TeamList &&
                        TeamList.map((item, index) => (
                            <TeamTag
                                key={index}
                                team={item}
                                onClick={() => alert('하')}
                            />
                        ))}
                </section>
                <section className="flex w-full gap-2 pt-2">
                    {RemainUser &&
                        RemainUser.map((item, index) => (
                            <NameTag key={index} color="gray">
                                {item.name}
                            </NameTag>
                        ))}
                </section>
            </section>{' '}
            <section className="flex justify-end pr-6">
                <Button color="white">{'pdf 다운로드'}</Button>
            </section>
            <section className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* 프로젝트 목록 렌더링 */}
                {ProjectList &&
                    ProjectList.map((item, index) => (
                        <ProjectCard
                            key={index}
                            id={item.id}
                            title={item.title}
                            subTitle={item.subTitle}
                            teams={item.teams}
                        />
                    ))}
            </section>
        </div>
    );
};

export default TrackListDetail;
