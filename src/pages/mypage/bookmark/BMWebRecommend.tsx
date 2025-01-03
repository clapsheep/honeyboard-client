import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { ProjectCardSkeletonList } from '@/components/templates';
import { Suspense } from 'react';
import { useLocation } from 'react-router';
const BMWebRecommend = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Header
                titleProps={{ title: '북마크' }}
                BreadcrumbProps={{ pathname }}
            >
                <TabNavigation routes={ROUTES} />
            </Header>

            <Suspense fallback={<ProjectCardSkeletonList />}>
                <></>
            </Suspense>
        </>
    );
};

export default BMWebRecommend;

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
        isActive: false,
    },
    {
        path: 'mypage/bookmark',
        name: '북마크',
        isActive: true,
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
                isActive: true,
            },
        ],
    },
];
