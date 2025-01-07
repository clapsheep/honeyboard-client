import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { ProjectCardSkeletonList } from '@/components/templates';
import MyAlgorithmList from '@/components/templates/MyAlgorithmList';
import { Suspense } from 'react';
import { useLocation } from 'react-router';

const MyAlgorithm = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Header
                titleProps={{ title: '나의 알고리즘' }}
                BreadcrumbProps={{ pathname }}
            >
                <TabNavigation routes={ROUTES} />
            </Header>

            <Suspense fallback={<ProjectCardSkeletonList />}>
                <MyAlgorithmList />
            </Suspense>
        </>
    );
};
export default MyAlgorithm;

const ROUTES = [
    {
        path: 'mypage/project',
        name: '프로젝트',
        isActive: false,
        children: [
            {
                path: 'mypage/project/track',
                name: '트랙 프로젝트',
                isActive: false,
            },
            {
                path: 'mypage/project/final',
                name: '최종 프로젝트',
                isActive: false,
            },
        ],
    },
    {
        path: 'mypage/algorithm',
        name: '알고리즘',
        isActive: true,
    },
    {
        path: 'mypage/bookmark',
        name: '북마크',
        isActive: false,
        children: [
            {
                path: 'mypage/bookmark/algorithm/concept',
                name: '알고리즘 개념',
                isActive: false,
            },
            {
                path: 'mypage/bookmark/algorithm/problem',
                name: '알고리즘 문제',
                isActive: false,
            },
            {
                path: 'mypage/bookmark/web/concept',
                name: '웹 개념',
                isActive: false,
            },
            {
                path: 'mypage/bookmark/web/recomend',
                name: '웹 추천',
                isActive: false,
            },
        ],
    },
];
