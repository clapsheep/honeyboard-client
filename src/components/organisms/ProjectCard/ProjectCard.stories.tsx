import { Meta, StoryObj } from '@storybook/react';
import ProjectCard from './ProjectCard';

const meta: Meta = {
    title: 'Components/Organisms/ProjectCard',
    component: ProjectCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
    args: {
        title: 'HoneyBoard',
        subTitle: '2024-12-21',
        onClick: () => alert('이동'),
    },
};

export const Finale: Story = {
    args: {
        title: 'HoneyBoard',
        subTitle: 'https://github.com/clapsheep/honeyboard-client',
        onClick: () => alert('이동'),
        teams: ['박수양', '지유림', '서주원'],
        img: 'https://picsum.photos/184',
    },
};
