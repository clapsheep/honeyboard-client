import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta = {
    title: 'Components/Molecules/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

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
