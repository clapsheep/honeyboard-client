import logo from '/assets/images/logo.png';
import { Icon, NavButton, Persona } from '@/components/atoms';
import NavMenu from '@/components/molecules/NavMenu/NavMenu';
import { logoutAPI } from '@/services/auth';
import { NavItem } from './NavItem';

interface NavigationProps {
    generation: string;
    name: string;
    role: string;
}

const Navigation = ({ generation, name }: NavigationProps) => {
    const handleLogout = async () => {
        try {
            await logoutAPI();
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex h-lvh flex-col items-center gap-1 border border-gray-400 pb-[6.25rem] pt-7">
            <h1>
                <img src={logo} alt="Honey Board" />
            </h1>
            <Persona generation={generation} name={name} />
            <nav className="h-full">
                <ul className="flex h-full flex-col">
                    <NavMenu menus={NavItem} />
                    <NavButton
                        key="마이페이지"
                        id="마이페이지"
                        title="마이페이지"
                        icon={<Icon id="user" />}
                        link="/mypage"
                        className="mt-auto"
                    />
                    <NavButton
                        key="로그아웃"
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
