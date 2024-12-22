import type { Meta, StoryObj } from '@storybook/react';
import ModalButton from './ModalButton';

const meta = {
    title: 'Components/Atoms/ModalButton',
    component: ModalButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ModalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const del: Story = {
    args: {
        action: 'delete',
        onClick: () => alert('delete'),
    },
};

export const confirm: Story = {
    args: {
        action: 'confirm',
        onClick: () => alert('confirm'),
    },
};
export const cancal: Story = {
    args: {
        action: 'cancel',
        onClick: () => alert('cancel'),
    },
};
