import { Meta, StoryObj } from '@storybook/react';
import WebSiteCard from './WebSiteCard';
import { BrowserRouter } from 'react-router';

const meta: Meta = {
    title: 'Components/Molecules/WebSiteCard',
    component: WebSiteCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            return (
                <BrowserRouter>
                    <div className="flex h-[96px] w-[270px] items-center justify-center">
                        <Story />
                    </div>
                </BrowserRouter>
            );
        },
    ],
} satisfies Meta<typeof WebSiteCard>;
export default meta;

type Story = StoryObj<typeof WebSiteCard>;

type WebSiteCardHooksProps = {
    title: string;
    subTitle: string;
    site?: string;
    id: string;
};

const WebSiteCardWithHooks = (args: WebSiteCardHooksProps) => {

    return (
        <WebSiteCard
            title={args.title}
            subTitle={args.subTitle}
            site={args.site}
            id={args.id}
        />
    );
};

export const Default: Story = {
    args: {
        title: 'Flex 연습사이트',
        subTitle: '2024-12-23',
        site: 'https://flexboxfroggy.com/#ko',
    },
    render: (args) => (
        <WebSiteCardWithHooks
            title={args.title}
            subTitle={args.subTitle}
            site={args.site}
            id={args.id}
        />
    ),
};

export const WithoutSite: Story = {
    args: {
        title: 'Flex 연습사이트',
        subTitle: '2024-12-23',
    },
    render: (args) => (
        <WebSiteCardWithHooks
            title={args.title}
            subTitle={args.subTitle}
            id={args.id}
        />
    ),
};
