import logo from '/assets/images/logo.png';
import { Icon, NavButton, Persona } from '@/components/atoms';
import NavMenu from '@/components/molecules/NavMenu/NavMenu';

interface NavigationProps {
    generation: string;
    name: string;
    role: string;
}

const Navigation = ({ generation, name }: NavigationProps) => {
    const navItem = [
        {
            name: '메인페이지',
            path: '/',
            icon: 'calendar',
        },
        {
            name: '프로젝트',
            icon: 'document',
            children: [
                {
                    name: '관통 프로젝트',
                    path: '/track/',
                },
                {
                    name: '파이널 프로젝트',
                    path: '/final',
                },
            ],
        },
        {
            name: '학습',
            icon: 'pen',
            children: [
                {
                    name: '알고리즘',
                    path: '/algorithm',
                },
                {
                    name: '웹',
                    path: '/web',
                },
            ],
        },
        {
            name: '음악',
            path: '/music',
            icon: 'music',
        },
        {
            name: '학생관리',
            path: '/admin',
            icon: 'edit-user',
        },
    ];

    const handleLogout = () => {};

    return (
        <section className="flex h-lvh flex-col items-center gap-1 border border-gray-400 pb-[6.25rem] pt-7">
            <h1>
                <img src={logo} alt="Honey Board" />
            </h1>
            <Persona generation={generation} name={name} />
            <nav className="h-full">
                <ul className="flex h-full flex-col">
                    <NavMenu menus={navItem} />
                    <NavButton
                        id="마이페이지"
                        title="마이페이지"
                        icon={<Icon id="user" />}
                        link="/mypage"
                        className="mt-auto"
                    />
                    <NavButton
                        id="로그아웃"
                        title="로그아웃"
                        icon={<Icon id="circle-close-red" />}
                        color="text-error-500"
                        onClick={handleLogout}
                        className="mt-4"
                    />
                </ul>
            </nav>
        </section>
    );
};

export default Navigation;
