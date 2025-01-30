const calcRouteStructure = (pathname: string) => {
    const routeList = pathname
        .substring(1)
        .split('/')
        .filter(
            (route) =>
                !/^\d+$/.test(route) &&
                route !== 'team' &&
                route !== 'create' &&
                route != 'edit',
        );
    const routeStructure = routeList.reduce(
        (acc, route, index) => {
            let name;
            switch (route) {
                case 'project':
                    name = '프로젝트';
                    break;
                case 'track':
                    name = '관통 프로젝트';
                    break;
                case 'final':
                    name = '파이널 프로젝트';
                    break;
                case 'study':
                    name = '학습';
                    break;
                case 'algorithm':
                    name = '알고리즘';
                    break;
                case 'web':
                    name = '웹';
                    break;
                case 'concept':
                    name = '개념';
                    break;
                case 'recommend':
                    name = '추천';
                    break;
                case 'problem':
                    name = '문제풀이';
                    break;
                case 'mypage':
                    name = '마이페이지';
                    break;
                case 'bookmark':
                    name = '북마크';
                    break;
                case 'music':
                    name = '음악';
                    break;
                case 'list':
                    name = '플레이리스트';
                    break;
                case 'search':
                    name = '검색';
                    break;
                case 'board':
                    name = '일지';
                    break;
                case 'solution':
                    name = '상세';
                    break;
                case 'admin':
                    name = '관리자';
                    break;
                case 'student':
                    name = '학생관리';
                    break;
                case 'generation':
                    name = '기수관리';
                    break;
            }

            const path = routeList
                .slice(0, index + 1)
                .reduce((pathAcc, curr) => `${pathAcc}/${curr}`, '');

            acc.push({
                path,
                name,
                isActive: false,
            });
            return acc;
        },
        [] as Array<{
            path: string;
            name: string | undefined;
            isActive: boolean;
        }>,
    );
    return routeStructure;
};

export default calcRouteStructure;
