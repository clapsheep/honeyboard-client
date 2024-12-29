import type { Meta, StoryObj } from '@storybook/react';
import Pagenation from './Pagenation';

const meta = {
    title: 'Components/Atoms/Pagenation',
    component: Pagenation,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagenation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        total: 20,
        now: 1,
        onClickLeft: () => {},
        onClickRight: () => {},
        onClick: () => {},
    },
};
