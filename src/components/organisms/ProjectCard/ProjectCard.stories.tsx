import { Meta, StoryObj } from '@storybook/react';
import ProjectCard from './ProjectCard';
import { BrowserRouter } from 'react-router';

const meta: Meta = {
    title: 'Components/Organisms/ProjectCard',
    component: ProjectCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <div className="flex w-[180px] items-center justify-center">
                    <Story />
                </div>
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
    args: {
        title: 'HoneyBoard',
        subTitle: '2024-12-21',
        id: '1',
        img: 'https://picsum.photos/184',
    },
};

export const Finale: Story = {
    args: {
        title: 'HoneyBoard',
        subTitle: 'https://github.com/clapsheep/honeyboard-client',
        id: '1',
        teams: ['박수양', '지유림', '서주원'],
        img: 'https://picsum.photos/184',
    },
};
