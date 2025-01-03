import { Icon, NavButton, Persona } from '@/components/atoms';
import NavMenu from '@/components/molecules/NavMenu/NavMenu';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';
import { NavItem } from './NavItem';
import logo from '/assets/images/logo.png';

interface NavigationProps {
    generation: string;
    name: string;
    role: string;
}

const Navigation = ({ generation, name }: NavigationProps) => {
    const { logout } = useAuth();

    return (
        <section className="fixed flex h-screen flex-col items-center gap-1 border border-gray-400 pb-[6.25rem] pt-7">
            <h1 aria-label="Honey Board">
                <Link to="/">
                    <img src={logo} alt="Honey Board" />
                </Link>
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
                        onClick={logout}
                        className="mt-4"
                    />
                </ul>
            </nav>
        </section>
    );
};

export default Navigation;
