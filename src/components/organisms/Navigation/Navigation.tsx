import { Icon, NavButton, Persona } from '@/components/atoms';
import NavMenu from '@/components/molecules/NavMenu/NavMenu';

interface NavigationProps {
    generation: string;
    name: string;
}

const Navigation = ({ generation, name }: NavigationProps) => {
    const navItem = [
        {
            name: '메인페이지',
            path: '/main',
            icon: 'calendar',
        },
        {
            name: '프로젝트',
            path: '/project',
            icon: 'document',
            children: [
                {
                    name: '관통프로젝트',
                    path: '/project/track',
                    children: [],
                },
                {
                    name: '파이널프로젝트',
                    path: '/project/final',
                    children: [],
                },
            ],
        },
        {
            name: '학습',
            path: '/study',
            icon: 'pen',
            children: [
                {
                    name: '알고리즘',
                    path: '/study/algorithm',
                    children: [],
                },
                {
                    name: '웹',
                    path: '/study/web',
                    children: [],
                },
            ],
        },
        {
            name: '음악',
            path: '/music',
            icon: 'music',
        },
        {
            name: '미니게임',
            path: '/game',
            icon: 'ball',
        },
        {
            name: '학생관리',
            path: '/student',
            icon: 'edit-user',
        },
        {
            name: '마이페이지',
            path: '/mypage',
            icon: 'user',
        },
    ];

    const handleLogout = () => {};

    return (
        <section className="flex h-lvh flex-col items-center gap-1 border border-gray-400 pt-7">
            <h1>
                <img src="src\assets\images\logo.png" alt="Honey Board" />
            </h1>
            <Persona generation={generation} name={name} />
            <NavMenu menus={navItem} />
            <NavButton
                id="로그아웃"
                title="로그아웃"
                icon={<Icon id="circle-close-red" />}
                color="text-error-500"
                onClick={handleLogout}
            />
        </section>
    );
};

export default Navigation;
