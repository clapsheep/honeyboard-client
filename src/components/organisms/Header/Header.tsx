import { Breadcrumb } from '@/components/molecules';
import { BreadcrumbProps } from '@/components/molecules/Breadcrumb/Breadcrumb';
import Title, { TitleProps } from '@/components/molecules/Title/Title';
import { forwardRef } from 'react';

interface HeaderProps {
    titleProps: TitleProps;
    children?: React.ReactNode;
    BreadcrumbProps?: BreadcrumbProps;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
    ({ titleProps, children, BreadcrumbProps }, ref) => {
        return (
            <header
                ref={ref}
                className="flex w-full flex-col bg-white px-9 pt-6 shadow-md"
            >
                {BreadcrumbProps && (
                    <div className="pb-3">
                        <Breadcrumb {...BreadcrumbProps} />
                    </div>
                )}
                <Title {...titleProps} />
                {children && <div className="pt-6">{children}</div>}
            </header>
        );
    },
);

Header.displayName = 'Header';

export default Header;
