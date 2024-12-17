import { Meta, StoryObj } from '@storybook/react';
import NameTag from './NameTag';

const meta = {
    title: 'Components/Atoms/NameTag',
    component: NameTag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NameTag>;

export default meta;
type Story = StoryObj<typeof NameTag>;
export const Default: Story = {
    args: {
        children: 'SSAFY',
        isLeader: true,
    },
};
