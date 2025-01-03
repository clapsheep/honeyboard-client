const calcRouteStructure = (pathname: string) => {
    const routeList = pathname.substring(1).split('/');
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
    return routeStructure.slice(0, -1);
};

export default calcRouteStructure;
